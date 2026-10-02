import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { languages } from '@/lib/languages';
import { BottomNav } from '@/components/BottomNav';

export function LanguagePage() {
  const [selected, setSelected] = useState('en');

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center gap-3">
        <a href="#/settings" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </a>
        <h1 className="text-lg font-bold">Language</h1>
      </div>

      <div className="px-2 py-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelected(lang.code)}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors"
          >
            <span className="text-xl">{lang.country}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{lang.native}</p>
              <p className="text-xs text-gray-500">{lang.name}</p>
            </div>
            {selected === lang.code && <Check className="w-5 h-5 text-[#00FF88]" />}
          </button>
        ))}
      </div>

      <BottomNav current="me" />
    </div>
  );
}
