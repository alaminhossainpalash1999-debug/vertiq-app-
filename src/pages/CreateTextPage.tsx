import { useState } from 'react';
import { ArrowLeft, Type, Check } from 'lucide-react';

export default function CreateTextPage() {
  const [text, setText] = useState('');
  const [bgColor, setBgColor] = useState('#8A2BE2');

  const colors = ['#8A2BE2', '#FF69B4', '#1A1025', '#0088FF', '#FF2D55', '#1a1a1a', '#FFD700', '#00FF88'];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center justify-between">
        <button onClick={() => window.location.hash = '#/camera'} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Text Post</h1>
        <button
          onClick={() => window.location.hash = '#/post-preview'}
          disabled={!text.trim()}
          className="text-sm font-bold text-[#8A2BE2] disabled:opacity-30 active:scale-95 transition-transform"
        >
          Next
        </button>
      </div>

      {/* Text editor */}
      <div className="flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div
          className="w-full max-w-md mx-auto flex items-center justify-center p-8 transition-colors"
          style={{ backgroundColor: bgColor, minHeight: '400px' }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
            maxLength={300}
            autoFocus
            className="w-full bg-transparent text-white text-center text-2xl font-bold outline-none resize-none placeholder-white/40"
            style={{ minHeight: '200px' }}
          />
        </div>

        {/* Color picker */}
        <div className="flex gap-3 mt-6 pb-8 px-4 overflow-x-auto">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setBgColor(c)}
              className={`w-9 h-9 rounded-full border-2 transition-transform active:scale-90 ${bgColor === c ? 'border-white' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
            >
              {bgColor === c && <Check className="w-4 h-4 text-white mx-auto" />}
            </button>
          ))}
        </div>

        {/* Type icon */}
        <div className="flex items-center gap-2 text-gray-600 pb-4">
          <Type className="w-4 h-4" />
          <span className="text-xs">{text.length}/300</span>
        </div>
      </div>
    </div>
  );
}
