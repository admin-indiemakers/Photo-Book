import { FrameProductPage } from '@/components/FrameProductPage';

export default function FramePage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <a href="/products" className="group flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#1a1a18]/60 hover:text-[#1a1a18] transition-all">
          <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#1a1a18] group-hover:text-white group-hover:border-[#1a1a18] transition-all duration-300 shadow-sm bg-white/50 backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="hidden sm:inline">Collections</span>
        </a>
      </div>
      <FrameProductPage />
    </main>
  );
}
