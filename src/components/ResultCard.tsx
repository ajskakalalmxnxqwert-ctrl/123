import { Download, Copy, PlaySquare, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { MediaResult } from "../types";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useState } from "react";

export function ResultCard({ result }: { result: MediaResult }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(result.downloadUrl);
      setCopied(true);
      toast.success("Download link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-4xl flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:h-64"
    >
      <div className="relative w-full shrink-0 bg-slate-200 dark:bg-slate-800 sm:w-1/3 aspect-[4/3] sm:aspect-auto">
        <img src={result.thumbnail} alt={result.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40" />
        <div className="absolute bottom-3 left-3 rounded bg-black/50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
          {result.type} • {result.duration}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-start justify-between">
            <div className="text-left">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white line-clamp-1">{result.title}</h3>
              <p className="flex items-center gap-1 font-medium text-slate-500 dark:text-slate-400">
                <span className="font-bold text-yellow-600">@{result.username}</span> • Public Story
              </p>
            </div>
            <span className="rounded bg-green-100 px-2 py-1 text-[10px] font-black uppercase tracking-tighter text-green-700 dark:bg-green-900/30 dark:text-green-400 whitespace-nowrap ml-4">
              Ready to Download
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-left text-xs font-semibold uppercase text-slate-400">
            <div>
              Quality: <span className="text-slate-700 dark:text-slate-300">HD 1080p</span>
            </div>
            <div>
              Format: <span className="text-slate-700 dark:text-slate-300">MP4</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3 sm:mt-0">
          <a
            href={`/api/download?url=${encodeURIComponent(result.downloadUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-bold text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Download HD Video
          </a>
          <button
            onClick={handleCopyLink}
            className="flex flex-1 items-center justify-center rounded-xl bg-slate-100 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {copied ? "Copied!" : "Copy Share Link"}
          </button>
          <button
            onClick={handleCopyLink}
            className="flex w-12 items-center justify-center rounded-xl bg-slate-100 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            aria-label="Share"
          >
            {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
