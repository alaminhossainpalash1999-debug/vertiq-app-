import { useState } from 'react';
import { ArrowLeft, PlayCircle, MessageCircle, Search, AtSign, FileStack, ChevronRight } from 'lucide-react';

const TABS = ['Watch history', 'Comments', 'Search history'] as const;
type Tab = (typeof TABS)[number];

export default function ActivityCenterPage() {
  const [tab, setTab] = useState<Tab>('Watch history');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center gap-3">
        <button onClick={() => window.location.hash = '#/me'} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Activity center</h1>
      </div>

      <div className="px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/10 mb-5">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-medium transition-colors relative ${tab === t ? 'text-white' : 'text-gray-500'}`}
            >
              {t}
              {tab === t && <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#00FF88] rounded-full" />}
            </button>
          ))}
        </div>

        {tab === 'Watch history' && (
          <div className="text-center py-16 text-gray-600">
            <PlayCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No watch history yet</p>
          </div>
        )}
        {tab === 'Comments' && (
          <div className="text-center py-16 text-gray-600">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No comments yet</p>
          </div>
        )}
        {tab === 'Search history' && (
          <div className="text-center py-16 text-gray-600">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No search history yet</p>
          </div>
        )}

        {/* Interactions */}
        <div className="mt-8">
          <p className="text-gray-500 font-medium mb-3 text-sm">Interactions with you</p>
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <RowItem icon={<AtSign className="w-5 h-5" />} label="Mentions" />
            <RowItem icon={<FileStack className="w-5 h-5" />} label="Reuses of your content" />
          </div>
        </div>
      </div>
    </div>
  );
}

function RowItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-gray-400">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-600" />
    </button>
  );
}
