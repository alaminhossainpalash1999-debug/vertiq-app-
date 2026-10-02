import { useState } from 'react';
import { ArrowLeft, Flame, Heart, Play, User, Eye } from 'lucide-react';

export default function PromotePage() {
  const [goal, setGoal] = useState('likes');

  const goals = [
    { id: 'likes', label: 'More likes & comments', icon: <Heart className="w-5 h-5" /> },
    { id: 'views', label: 'More video views', icon: <Play className="w-5 h-5" /> },
    { id: 'followers', label: 'More followers', icon: <User className="w-5 h-5" /> },
    { id: 'profile', label: 'More profile views', icon: <Eye className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center gap-3">
        <button onClick={() => window.location.hash = '#/me'} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Promote</h1>
      </div>

      <div className="px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/10 mb-5">
          <button className="pb-3 text-sm font-bold relative">
            Create
            <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#00FF88] rounded-full" />
          </button>
          <button className="pb-3 text-sm text-gray-500">Dashboard</button>
          <button className="pb-3 text-sm text-gray-500">Mine</button>
        </div>

        {/* Goal */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h2 className="font-bold mb-4">Choose your goal</h2>
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 rounded-lg text-sm">Boost account</span>
            <span className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-400">Get sales</span>
          </div>
          <div className="space-y-3">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => setGoal(g.id)}
                className="w-full flex justify-between items-center py-2"
              >
                <span className="flex items-center gap-3 text-sm">
                  <span className="text-gray-400">{g.icon}</span>
                  {g.label}
                </span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${goal === g.id ? 'border-[#00FF88]' : 'border-gray-600'}`}>
                  {goal === g.id && <div className="w-2.5 h-2.5 bg-[#00FF88] rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="mt-3 bg-gradient-to-br from-[#00FF88]/10 to-[#0088FF]/10 rounded-xl p-6 border border-white/10 text-center">
          <Flame className="w-10 h-10 mx-auto text-[#00FF88] mb-3" />
          <p className="font-bold text-base">Reach more people</p>
          <p className="text-gray-400 text-sm mt-1">Promote your content to grow your audience on Vertiq</p>
          <button className="mt-4 bg-[#00FF88] text-black font-bold px-8 py-2.5 rounded-lg text-sm active:scale-95 transition-transform">
            Start promotion
          </button>
        </div>
      </div>
    </div>
  );
}
