import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
    >
      <div className="relative flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-slate-300 dark:bg-slate-600">
        <Sun className="absolute h-3 w-3 rotate-0 scale-100 text-slate-600 transition-all dark:-rotate-90 dark:scale-0 dark:text-slate-200" />
        <Moon className="absolute h-3 w-3 rotate-90 scale-0 text-slate-600 transition-all dark:rotate-0 dark:scale-100 dark:text-slate-200" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Dark Mode</span>
    </button>
  );
}
