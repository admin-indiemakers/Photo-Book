import { AcrylicFramesProductPage } from '@/components/AcrylicFramesProductPage';

export default function AcrylicFramesPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] overflow-y-auto">
      <div className="absolute top-6 left-6 z-50">
        <a href="/" className="flex items-center gap-2 text-sm font-medium hover:text-[#E85D26] transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-black/10 shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </a>
      </div>
      <AcrylicFramesProductPage />
    </main>
  );
}
