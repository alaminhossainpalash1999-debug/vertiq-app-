import { ArrowLeft, Check, Music2, Hash, AtSign } from 'lucide-react';

export default function PostPreviewPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center justify-between">
        <button onClick={() => window.history.back()} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Post</h1>
        <button
          onClick={() => window.location.hash = '#/'}
          className="text-sm font-bold text-[#00FF88] active:scale-95 transition-transform"
        >
          Publish
        </button>
      </div>

      <div className="px-4 py-6">
        {/* Preview area */}
        <div className="w-full aspect-[9/16] max-h-[400px] mx-auto bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border border-white/10 flex items-center justify-center mb-6">
          <p className="text-gray-600 text-sm">Your capture preview</p>
        </div>

        {/* Caption */}
        <div className="mb-5">
          <label className="text-xs text-gray-500 font-medium mb-2 block">Caption</label>
          <textarea
            placeholder="Write a caption..."
            maxLength={150}
            rows={3}
            className="w-full bg-[#1f1f1f] rounded-lg px-4 py-3 text-sm outline-none focus:bg-[#2a2a2a] transition-colors resize-none"
          />
        </div>

        {/* Options */}
        <div className="space-y-1 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5">
            <span className="flex items-center gap-3 text-sm"><Music2 className="w-4 h-4 text-gray-400" /> Add sound</span>
            <span className="text-xs text-gray-500">Original audio ›</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5">
            <span className="flex items-center gap-3 text-sm"><Hash className="w-4 h-4 text-gray-400" /> Hashtags</span>
            <span className="text-xs text-gray-500">Add ›</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="flex items-center gap-3 text-sm"><AtSign className="w-4 h-4 text-gray-400" /> Mention</span>
            <span className="text-xs text-gray-500">Add ›</span>
          </div>
        </div>

        {/* Privacy */}
        <div className="mt-4 bg-white/5 rounded-xl border border-white/10 p-4">
          <p className="text-xs text-gray-500 mb-3">Who can view this video</p>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-[#00FF88]/20 text-[#00FF88] rounded-lg text-xs font-bold">Everyone</span>
            <span className="px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-400">Friends</span>
            <span className="px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-400">Only me</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pb-8">
          <button
            onClick={() => window.location.hash = '#/'}
            className="flex-1 py-3 bg-white/10 rounded-lg font-medium text-sm hover:bg-white/15 transition-colors"
          >
            Drafts
          </button>
          <button
            onClick={() => window.location.hash = '#/'}
            className="flex-1 py-3 bg-[#00FF88] text-black rounded-lg font-bold text-sm active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> Post
          </button>
        </div>
      </div>
    </div>
  );
}
