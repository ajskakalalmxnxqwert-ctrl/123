import { ExternalLink } from "lucide-react";

export function RelatedTools() {
  const tools = [
    { name: "Snapchat Video Downloader", desc: "Download high quality videos quickly." },
    { name: "Snapchat Spotlight Downloader", desc: "Save trending spotlight clips." },
    { name: "Snapchat Image Downloader", desc: "Extract photos from public stories." },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white text-center mb-10">
          More Free Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          {tools.map((tool, i) => (
            <a
              key={i}
              href="#"
              className="group flex flex-col items-start justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-yellow-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-yellow-500"
            >
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tool.desc}</p>
              </div>
              <ExternalLink className="mt-4 h-5 w-5 text-slate-400 transition-colors group-hover:text-yellow-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
