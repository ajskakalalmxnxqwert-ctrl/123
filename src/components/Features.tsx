import { ShieldCheck, Zap, MonitorSmartphone, Video } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Fast Downloads",
      description: "High-speed servers for instant access.",
      colorClass: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      num: "01",
    },
    {
      title: "Safe & Private",
      description: "No registration or login required.",
      colorClass: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      num: "02",
    },
    {
      title: "HD Quality",
      description: "Download the best available resolution.",
      colorClass: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
      num: "03",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Why choose our Snapchat Downloader?
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            We provide the most reliable and feature-rich tool for fetching public Snapchat media without restrictions.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 rounded-xl border border-slate-200/50 bg-white/50 p-4 dark:border-slate-800/50 dark:bg-slate-900/50">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${item.colorClass}`}>
                {item.num}
              </div>
              <div className="text-sm text-left">
                <p className="font-bold text-slate-800 dark:text-slate-100">{item.title}</p>
                <p className="text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
