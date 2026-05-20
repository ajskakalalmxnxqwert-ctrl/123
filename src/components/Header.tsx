import { Ghost } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8 justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-white shadow-inner">
            <Ghost className="h-5 w-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            SnapSaver<span className="text-yellow-500">.pro</span>
          </span>
        </a>
        <nav className="hidden gap-6 text-sm font-medium text-slate-500 dark:text-slate-400 md:flex items-center ml-auto mr-8">
          <a href="#" className="text-yellow-600 border-b-2 border-yellow-500 pb-1">
            Downloader
          </a>
          <a href="#how-to" className="hover:text-slate-800 dark:hover:text-slate-50 transition-colors">
            How it Works
          </a>
          <a href="#faq" className="hover:text-slate-800 dark:hover:text-slate-50 transition-colors">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
