import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { DownloaderForm } from "./components/DownloaderForm";
import { ResultCard } from "./components/ResultCard";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { HowTo } from "./components/HowTo";
import { Features } from "./components/Features";
import { FAQ } from "./components/FAQ";
import { RelatedTools } from "./components/RelatedTools";
import { MediaResult } from "./types";
import { Toaster } from "sonner";

export default function App() {
  const [result, setResult] = useState<MediaResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-950">
      <Header />
      
      <main className="flex-1">
        <Hero>
          <div className="flex flex-col gap-6">
            <DownloaderForm 
              onResult={(data) => setResult(data)} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
            />
            
            {isLoading && <LoadingSkeleton />}
            
            {!isLoading && result && (
              <ResultCard result={result} />
            )}
          </div>
        </Hero>

        <HowTo />
        <Features />
        <FAQ />
        <RelatedTools />
      </main>

      <Footer />
      <Toaster position="bottom-center" richColors />
    </div>
  );
}
