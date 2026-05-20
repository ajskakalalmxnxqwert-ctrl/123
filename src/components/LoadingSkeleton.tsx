import { motion } from "motion/react";

export function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto mt-12 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-pulse"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-[9/16] w-full max-w-[200px] shrink-0 bg-slate-200 dark:bg-slate-800 sm:w-1/3"></div>
        <div className="flex flex-col p-6 sm:w-2/3">
          <div className="h-6 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800"></div>
          <div className="mt-2 h-4 w-1/4 rounded-md bg-slate-200 dark:bg-slate-800"></div>
          
          <div className="mt-4 flex flex-col gap-2">
            <div className="h-12 w-full rounded-lg bg-slate-100 dark:bg-slate-800/50"></div>
            <div className="h-12 w-full rounded-lg bg-slate-100 dark:bg-slate-800/50"></div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800"></div>
            <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
