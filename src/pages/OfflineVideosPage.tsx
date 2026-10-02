import { ArrowLeft, Download } from 'lucide-react';

export default function OfflineVideosPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center gap-3">
        <button onClick={() => window.location.hash = '#/me'} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Offline videos</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-32 text-gray-600">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Download className="w-10 h-10 opacity-40" />
        </div>
        <p className="text-white font-semibold text-base">No offline videos</p>
        <p className="text-sm mt-1 text-gray-500">Download videos to watch them without internet</p>
      </div>
    </div>
  );
}
