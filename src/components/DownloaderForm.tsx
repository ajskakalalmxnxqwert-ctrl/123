import { useState } from "react";
import React from "react";
import { Link, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

interface DownloaderFormProps {
  onResult: (data: any) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export function DownloaderForm({ onResult, isLoading, setIsLoading }: DownloaderFormProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a valid Snapchat URL.");
      return;
    }
    
    if (!url.includes("snapchat.com")) {
      toast.error("URL must be from snapchat.com");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      
      const data = await res.json();
      if (data.success) {
        onResult(data);
        toast.success("Media found successfully!");
      } else {
        toast.error(data.error || "Failed to fetch media.");
        onResult(null);
      }
    } catch (err) {
      toast.error("Network error. Please try again later.");
      onResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="flex gap-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 flex-col sm:flex-row">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Snapchat URL here (e.g. snapchat.com/add/username/...)"
          required
          className="flex-1 bg-transparent px-6 py-4 font-medium text-slate-600 focus:outline-none dark:text-slate-200"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center rounded-xl bg-yellow-400 px-8 py-4 font-bold text-slate-900 shadow-md transition-all hover:bg-yellow-500 active:scale-95 disabled:pointer-events-none disabled:opacity-50 min-w-[160px]"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Download Now"}
        </button>
      </form>
    </div>
  );
}
