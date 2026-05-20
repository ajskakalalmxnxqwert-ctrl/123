import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const faqs = [
  {
    q: "How do I download Snapchat stories?",
    a: "Simply open Snapchat, copy the link to the story or spotlight you want, and paste it into the search box on our website. Click 'Download' and your media will be ready in seconds.",
  },
  {
    q: "Is this tool free?",
    a: "Yes, our Snapchat Downloader is 100% free to use. There are no hidden fees or subscriptions required.",
  },
  {
    q: "Does it work on mobile?",
    a: "Absolutely! Our tool is fully responsive and works perfectly on iOS, Android, and tablets through your standard web browser.",
  },
  {
    q: "Can I download spotlight videos?",
    a: "Yes. You can download both public stories and spotlight videos using the same process. Just ensure the link is publicly accessible.",
  },
  {
    q: "Is login required?",
    a: "No. You never need to provide your Snapchat login details or connect your account. Our tool works entirely externally by fetching data through public URL sharing.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-5">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between text-left focus:outline-none"
              >
                <span className="text-base font-medium text-slate-900 dark:text-slate-100">{faq.q}</span>
                <ChevronDown className={cn("h-5 w-5 text-slate-500 transition-transform duration-200", openIdx === idx && "rotate-180")} />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIdx === idx ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-sm text-slate-500 dark:text-slate-400 pb-2">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
