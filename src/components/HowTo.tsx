import { Copy, ArrowRight, Download } from "lucide-react";

export function HowTo() {
  const steps = [
    {
      icon: Copy,
      title: "1. Copy Link",
      description: "Open Snapchat, find the story or spotlight you want to save. Tap 'Share' and then 'Copy Link'.",
    },
    {
      icon: ArrowRight,
      title: "2. Paste URL",
      description: "Return to our tool and paste the copied Snapchat URL into the white search box above.",
    },
    {
      icon: Download,
      title: "3. Download",
      description: "Click the Download button. Wait a few seconds for the media to process, then save it to your device.",
    },
  ];

  return (
    <section id="how-to" className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          How to download Snapchat Stories?
        </h2>
        <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          It takes less than 30 seconds to fetch and download your favorite content. Follow these three simple steps:
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400 ring-8 ring-slate-50 dark:ring-slate-950/50">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-[200px]">{step.description}</p>
              
              {idx !== steps.length - 1 && (
                <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
