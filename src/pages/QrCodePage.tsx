import { ArrowLeft, ScanLine, Link2, Share } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function QrCodePage() {
  const { profile } = useAuth();
  const username = profile?.username || 'palashhvac';
  const name = (profile as any)?.display_name || profile?.username || 'User';
  const profileLink = `${window.location.origin}/#/profile/${username}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(profileLink)}&color=000000&bgcolor=ffffff`;

  return (
    <div className="min-h-screen bg-[#0a2a6b] relative flex flex-col items-center"
      style={{background: 'radial-gradient(circle at 30% 20%, #1e5bff 0%, #0a2a6b 60%, #000 100%)'}}>

      {/* Top bar */}
      <div className="w-full flex justify-between p-6 text-white">
        <button onClick={() => window.history.back()}><ArrowLeft size={32} /></button>
        <button><ScanLine size={32} /></button>
      </div>

      {/* Card */}
      <div className="mt-16 w-[85%] max-w-[360px]">
        <div className="bg-white rounded-[28px] p-6 flex flex-col items-center relative pt-12 shadow-2xl">
          {/* Avatar */}
          <div className="absolute -top-10 w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-200">
            <img src={profile?.avatar_url || 'https://i.pravatar.cc/100'} className="w-full h-full object-cover" />
          </div>

          <h2 className="text-[20px] font-black mt-2">{name}</h2>
          <p className="text-gray-400 mb-4">@{username}</p>

          {/* QR - TikTok style dots */}
          <img src={qrUrl} className="w-[260px] h-[260px] rounded-xl" alt="QR" />

          <p className="mt-4 font-bold flex items-center gap-1"><span className="text-[18px]">♪</span> TikTok</p>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={() => navigator.clipboard.writeText(profileLink)} className="flex-1 bg-white rounded-2xl py-3 flex flex-col items-center font-bold text-[14px]">
            <Link2 className="mb-1" /> Copy link
          </button>
          <button onClick={() => navigator.share?.({url: profileLink})} className="flex-1 bg-white rounded-2xl py-3 flex flex-col items-center font-bold text-[14px]">
            <Share className="mb-1" /> Share profile
          </button>
        </div>
      </div>

      <p className="text-white/60 text-center mt-auto mb-10 text-[14px]">Tap background to change style</p>
    </div>
  );
}