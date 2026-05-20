import { Ghost } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-slate-200 bg-white px-8 py-4 dark:border-slate-800 dark:bg-slate-900 flex-col md:flex-row gap-4">
      <p className="text-[11px] font-medium text-slate-400">
        &copy; {new Date().getFullYear()} SnapSaver Technology. Not affiliated with Snap Inc. All media remains property of original creators.
      </p>
      <div className="flex gap-4 text-[11px] text-slate-500 dark:text-slate-400">
        <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300">Privacy Policy</a>
        <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300">Terms of Service</a>
        <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300">Contact</a>
      </div>
    </footer>
  );
}
