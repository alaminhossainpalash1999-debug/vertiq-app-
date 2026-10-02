import { ArrowLeft, Users } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';

export default function FriendsPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center gap-3">
        <button onClick={() => window.location.hash = '#/'} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Friends</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-32 text-gray-600">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Users className="w-10 h-10 opacity-40" />
        </div>
        <p className="text-white font-semibold text-base">No friends yet</p>
        <p className="text-sm mt-1 text-gray-500">Start following people to see their content here</p>
        <button
          onClick={() => window.location.hash = '#/search'}
          className="mt-6 bg-[#00FF88] text-black font-bold px-8 py-2.5 rounded-lg text-sm active:scale-95 transition-transform"
        >
          Find friends
        </button>
      </div>

      <BottomNav current="friends" />
    </div>
  );
}
