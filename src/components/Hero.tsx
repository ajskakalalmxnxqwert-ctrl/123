import React from "react";
export function Hero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-slate-50 pb-24 pt-16 dark:bg-slate-950 md:pb-32 md:pt-24 flex flex-col items-center justify-center px-4 md:px-12">
      <div className="container mx-auto text-center w-full max-w-4xl flex flex-col items-center gap-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-3 text-4xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            Snapchat Story Downloader
          </h1>
          <p className="mx-auto text-lg text-slate-500 dark:text-slate-400">
            Download Snapchat stories, spotlight videos, and public media instantly without installing apps.
          </p>
        </div>
        <div className="w-full flex justify-center">
          {children}
        </div>
      </div>
    </section>
  );
}
