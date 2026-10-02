import { useEffect, useState, useRef } from 'react';
import { supabase, type LivestreamWithHost } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { BottomNav } from '@/components/BottomNav';

export function LivePage() {
  const { user } = useAuth();
  const [streams, setStreams] = useState<LivestreamWithHost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const startY = useRef(0);

  useEffect(() => {
    const fetchStreams = async () => {
      const { data } = await supabase.from('live_streams').select('*, host:host_id(username, avatar_url)').eq('is_live', true).order('created_at', { ascending: false });
      if (data) setStreams(data as any);
      setLoading(false);
    };
    fetchStreams();
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => { startY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (currentIndex === null) return;
    const diff = startY.current - e.changedTouches[0].clientY;
    if (diff > 50 && currentIndex < streams.length - 1) setCurrentIndex(currentIndex + 1);
    if (diff < -50 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  if (currentIndex!== null && streams[currentIndex]) {
    const s = streams[currentIndex];
    return (
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="h-screen bg-black text-white flex flex-col relative">
        <div className="absolute top-0 w-full p-3 flex justify-between z-20">
          <div className="flex items-center gap-2 bg-black/50 rounded-full pr-3">
            <img src={s.host?.avatar_url || `https://i.pravatar.cc/100?img=${s.id}`} className="w-10 h-10 rounded-full" />
            <div><p className="text-sm font-bold">{s.host?.username || s.title}</p><p className="text-[10px] opacity-70">{s.viewer_count || 15} viewers</p></div>
            <button className="bg-[#FE2C55] px-3 py-1 rounded-full text-xs font-bold">+ Follow</button>
          </div>
          <div className="flex gap-2"><span className="bg-black/50 px-2 py-1 rounded-full text-xs">{s.viewer_count || 6}</span><button onClick={() => setCurrentIndex(null)} className="w-8 h-8 bg-black/50 rounded-full">X</button></div>
        </div>
        <div className="flex-1 bg-[#1a1a1a] grid grid-cols-2 gap-1">
           <div className="bg-[#222] flex items-center justify-center text-white/20">Host View</div>
           <div className="bg-[#222] flex items-center justify-center text-white/20">Guest View</div>
        </div>
        <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
          <div className="flex gap-2"><div className="flex-1 bg-white/20 rounded-full px-4 py-2.5 text-sm">Type a message...</div><div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center">🌹</div><div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center">🎁</div></div>
          <p className="text-[10px] text-center opacity-30 mt-2">Swipe up for next live</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="flex justify-between items-center p-4 sticky top-0 bg-black z-10"><span>≡</span><h1 className="font-bold">Discover LIVE</h1><a href="#/">X</a></div>
      <div className="flex gap-3 overflow-x-auto px-4 py-2">
        <div className="flex flex-col items-center min-w-[65px]"><div className="w-16 h-16 rounded-full bg-[#2a2a2a] flex items-center justify-center text-xl">+</div><p className="text-xs mt-1">Go LIVE</p></div>
        {streams.map((s, i) => (
          <div key={s.id} onClick={() => setCurrentIndex(i)} className="flex flex-col items-center min-w-[65px] cursor-pointer"><div className="w-16 h-16 rounded-full border-2 border-[#FE2C55]"><img src={s.host?.avatar_url || `https://i.pravatar.cc/100?img=${i+1}`} className="w-full h-full rounded-full object-cover" /></div><p className="text-[11px] mt-1 truncate w-[60px]">{s.host?.username || s.title}</p></div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1 p-1">
        {streams.map((s, i) => (
          <div key={s.id} onClick={() => setCurrentIndex(i)} className="aspect-square bg-[#1a1a1a] rounded-xl overflow-hidden relative">
            <img src={`https://i.pravatar.cc/300?img=${i+5}`} className="w-full h-full object-cover" />
            <div className="absolute top-1 left-1 bg-black/60 text-[10px] px-2 py-0.5 rounded-full">{i===0? 'Host' : `● ${s.viewer_count || 5}`}</div>
            <div className="absolute bottom-1 left-1 right-1 bg-black/60 rounded-full px-2 py-1 text-[10px] truncate">{s.title || s.host?.username} +</div>
          </div>
        ))}
        {[1,2,3].map(n => (<div key={n} className="aspect-square bg-[#222] rounded-xl flex flex-col items-center justify-center"><span className="text-2xl">+</span><span className="text-xs opacity-50">Request</span></div>))}
      </div>
      <BottomNav />
    </div>
  );
}
