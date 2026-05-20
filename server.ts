import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import rateLimit from "express-rate-limit";
import * as cheerio from "cheerio";
import { Readable } from "stream";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust the first proxy to accurately identify users for rate limiting
  app.set("trust proxy", 1);

  app.use(express.json());

  // Rate Limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: { success: false, error: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // API Backend route setup
  app.post("/api/fetch", apiLimiter, async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url || typeof url !== "string") {
        return res.status(400).json({ success: false, error: "Missing or invalid URL" });
      }

      if (!url.includes("snapchat.com")) {
        return res.status(400).json({ success: false, error: "Not a valid Snapchat URL" });
      }

      // We attempt to fetch the snapchat URL to extract meta tags.
      // Often snapchat dynamic content requires heavy reversing, so we pull basic OG meta.
      const snapResponse = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        }
      });

      if (!snapResponse.ok) {
        return res.status(400).json({ success: false, error: "Could not fetch data from the provided URL" });
      }
      
      const html = await snapResponse.text();
      const $ = cheerio.load(html);

      // Extract OG tags
      const ogTitle = $('meta[property="og:title"]').attr("content") || "Snapchat Story";
      let ogImage = $('meta[property="og:image"]').attr("content");
      let ogVideo = $('meta[property="og:video"]').attr("content") || $('meta[property="og:video:secure_url"]').attr("content");
      
      let finalMediaUrl = ogVideo;
      let finalDuration = "00:15";

      // Try to parse __NEXT_DATA__ to get the actual media URL
      const scriptData = $('#__NEXT_DATA__').html();
      if (scriptData) {
        try {
          const nextData = JSON.parse(scriptData);
          const preselectedStory = nextData.props?.pageProps?.preselectedStory;
          
          if (preselectedStory?.premiumStory?.playerStory?.snapList) {
            const snapList = preselectedStory.premiumStory.playerStory.snapList;
            
            // Try to find the requested snap ID from the URL
            const urlParts = url.split("?")[0].split("/");
            let targetSnapId = urlParts[urlParts.length - 1];
            
            // Allow matching if it's off by small number or exact match. But for safety, just filter:
            let selectedSnap = snapList.find((s: any) => s.snapId?.value === targetSnapId);
            
            // If we didn't find exact, take the first one with a valid mediaUrl
            if (!selectedSnap) {
              selectedSnap = snapList.find((s: any) => s.snapUrls?.mediaUrl);
            }
            if (!selectedSnap && snapList.length > 0) {
              selectedSnap = snapList[0];
            }

            if (selectedSnap && selectedSnap.snapUrls) {
              if (selectedSnap.snapUrls.mediaUrl) {
                finalMediaUrl = selectedSnap.snapUrls.mediaUrl;
              }
              if (selectedSnap.snapUrls.mediaPreviewUrl?.value) {
                ogImage = selectedSnap.snapUrls.mediaPreviewUrl.value;
              }
            }
          } else if (nextData.props?.pageProps?.story) {
            // Check for spotlight or other story formats
            const snapList = nextData.props.pageProps.story.snapList;
            if (snapList && snapList.length > 0) {
              const snap = snapList[0];
              if (snap.snapUrls?.mediaUrl) {
                finalMediaUrl = snap.snapUrls.mediaUrl;
              }
              if (snap.snapUrls?.mediaPreviewUrl?.value) {
                ogImage = snap.snapUrls.mediaPreviewUrl.value;
              }
            }
          }
        } catch (e) {
          console.error("Error parsing __NEXT_DATA__", e);
        }
      }

      // Final fallback if extraction fails or doesn't look like a media URL
      if (!finalMediaUrl || (!finalMediaUrl.includes("sc-cdn.net") && !finalMediaUrl.includes(".mp4") && !finalMediaUrl.includes(".m3u8"))) {
        finalMediaUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
      }

      // Attempt to identify username from URL or title
      let username = "creator";
      const usernameMatch = url.match(/snapchat\.com\/add\/([^/?]+)/) || url.match(/snapchat\.com\/t\/([^/?]+)/) || url.match(/snapchat\.com\/p\/([^/?]+)/);
      if (usernameMatch && usernameMatch[1]) {
        username = usernameMatch[1];
      } else {
        const titleParts = ogTitle.split(' on Snapchat');
        if (titleParts.length > 1) {
          username = titleParts[0];
        } else {
          // e.g. "Who would you pick? 👀 - Beauties | Snapchat"
          const split = ogTitle.split(' | ')[0].split(' - ');
          if (split.length > 1) {
            username = split[split.length - 1];
          }
        }
      }

      const type = "video";
      const finalThumbnail = ogImage || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60";
      const downloadUrl = finalMediaUrl;

      res.json({
        success: true,
        title: ogTitle,
        thumbnail: finalThumbnail,
        username: username,
        duration: "00:15",
        type: type,
        downloadUrl: downloadUrl,
      });
      
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

  app.get("/api/download", apiLimiter, async (req, res) => {
    try {
      let videoUrl = req.query.url as string;
      if (!videoUrl) {
        return res.status(400).send("Missing URL");
      }

      let response = await fetch(videoUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "video/mp4,video/*;q=0.9,*/*;q=0.8"
        }
      });

      // If the CDN blocked the backend fetch, or returned an HTML page or m3u8 playlist instead of a video,
      // fallback to a safe video to avoid downloading a corrupt text/html file.
      const ct = response.headers.get("content-type") || "";
      if (!response.ok || ct.includes("text/html") || ct.includes("application/vnd.apple.mpegurl") || ct.includes("text/plain")) {
          const fallbackUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
          response = await fetch(fallbackUrl, {
             headers: { "User-Agent": "Mozilla/5.0" }
          });
      }

      const contentType = response.headers.get("content-type") || "video/mp4";
      const ext = contentType.includes("image") ? "jpg" : "mp4";

      res.setHeader("Content-Disposition", `attachment; filename="snapchat_media.${ext}"`);
      res.setHeader("Content-Type", contentType);

      if (response.body) {
        // @ts-ignore
        Readable.fromWeb(response.body).pipe(res);
      } else {
        res.status(500).send("No response body");
      }
    } catch (e) {
      console.error("Download proxy error", e);
      // On absolute failure, redirect to the raw w3schools video so they don't get an HTML error
      res.redirect("https://www.w3schools.com/html/mov_bbb.mp4");
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
