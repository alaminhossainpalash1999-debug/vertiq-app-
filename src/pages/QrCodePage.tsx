import { ArrowLeft, QrCode as QrIcon, Link2, Share, ScanLine } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function QrCodePage() {
  const { profile } = useAuth();
  const storedUsername = localStorage.getItem('edit_username') || profile?.username || 'user';
  const storedName = localStorage.getItem('edit_name') || profile?.username || 'User';
  const storedAvatar = localStorage.getItem('edit_avatar');
  const profileLink = `${window.location.origin}/#/profile/${storedUsername}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(profileLink)}&color=000000&bgcolor=ffffff`;

  return (
    <div
      className="min-h-screen relative flex flex-col items-center"
      style={{ background: 'radial-gradient(circle at 30% 20%, #003366 0%, #001a33 60%, #000 100%)' }}
    >
      <div className="w-full flex justify-between p-6 text-white">
        <button onClick={() => window.location.hash = '#/me'} className="active:scale-90 transition-transform">
          <ArrowLeft size={28} />
        </button>
        <button className="active:scale-90 transition-transform">
          <ScanLine size={28} />
        </button>
      </div>

      <div className="mt-12 w-[85%] max-w-[340px]">
        <div className="bg-white rounded-[28px] p-6 flex flex-col items-center relative pt-14 shadow-2xl">
          <div className="absolute -top-10 w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-200">
            {storedAvatar ? (
              <img src={storedAvatar} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#00FF88] to-[#0088FF] flex items-center justify-center text-2xl font-bold text-black">
                {storedUsername?.[0]?.toUpperCase() || '?'}
              </div>
            )}
          </div>

          <h2 className="text-[20px] font-black text-black mt-2">{storedName}</h2>
          <p className="text-gray-400 mb-4">@{storedUsername}</p>

          <img src={qrUrl} className="w-[260px] h-[260px] rounded-xl" alt="QR" />

          <p className="mt-4 font-bold flex items-center gap-1.5 text-black">
            <QrIcon className="w-4 h-4" />
            <span className="text-sm">Vertiq</span>
          </p>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigator.clipboard.writeText(profileLink)}
            className="flex-1 bg-white rounded-2xl py-3 flex flex-col items-center font-bold text-[14px] text-black active:scale-95 transition-transform"
          >
            <Link2 className="mb-1" /> Copy link
          </button>
          <button
            onClick={() => navigator.share?.({ url: profileLink })}
            className="flex-1 bg-white rounded-2xl py-3 flex flex-col items-center font-bold text-[14px] text-black active:scale-95 transition-transform"
          >
            <Share className="mb-1" /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
