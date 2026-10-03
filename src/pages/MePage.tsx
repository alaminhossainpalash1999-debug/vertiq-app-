import { useState } from "react";
import { Settings, ArrowLeft, Wallet, QrCode, Rocket, Video } from "lucide-react";

interface Props {
  showSettings?: boolean;
  onCloseSettings?: () => void;
}

export default function MePage({ showSettings: externalShow, onCloseSettings }: Props = {}) {
  const [internalShow, setInternalShow] = useState(false);
  const showSettings = externalShow ?? internalShow;
  const setShowSettings = onCloseSettings ?? setInternalShow;

  function closeDrawerAndNavigate(hash: string) {
    setShowSettings(false);
    setTimeout(() => {
      window.location.hash = hash;
    }, 200);
  }

  const storedName = localStorage.getItem('edit_name') || '';
  const storedUsername = localStorage.getItem('edit_username') || 'vertiq_user';
  const storedBio = localStorage.getItem('edit_bio') || 'Welcome to Vertiq ✨';
  const storedAvatar = localStorage.getItem('edit_avatar');

  return (
    <div className="min-h-screen bg-[#1A1025] text-white flex flex-col relative overflow-hidden">
      <div className="h-[60px] flex items-center justify-between px-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.hash = '#/'} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-bold">My Profile</h1>
        </div>
        <button onClick={() => setShowSettings(true)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col items-center pt-10">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#FF69B4] flex items-center justify-center text-4xl font-black text-white overflow-hidden">
          {storedAvatar ? <img src={storedAvatar} className="w-full h-full object-cover" /> : 'V'}
        </div>
        <h2 className="mt-4 text-[18px] font-bold">@{storedUsername || 'vertiq_user'}</h2>
        {storedName && <p className="text-white/80 text-sm mt-0.5">{storedName}</p>}
        <p className="text-white/60 text-sm mt-0.5">{storedBio || 'Welcome to Vertiq ✨'}</p>

        {/* Stats as white rounded cards */}
        <div className="flex gap-3 mt-6">
          <div className="bg-white rounded-xl px-5 py-3 text-center">
            <p className="font-bold text-[18px] text-[#8A2BE2]">0</p>
            <p className="text-gray-500 text-xs">Following</p>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 text-center">
            <p className="font-bold text-[18px] text-[#8A2BE2]">0</p>
            <p className="text-gray-500 text-xs">Followers</p>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 text-center">
            <p className="font-bold text-[18px] text-[#8A2BE2]">0</p>
            <p className="text-gray-500 text-xs">Likes</p>
          </div>
        </div>

        <button
          onClick={() => closeDrawerAndNavigate('#/edit-profile')}
          className="mt-6 bg-[#8A2BE2] hover:bg-[#7B1ED0] text-white font-semibold px-8 py-2.5 rounded-full transition-colors text-sm active:scale-95"
        >
          Edit Profile
        </button>

        <div className="mt-12 flex flex-col items-center text-white/40">
          <Video className="w-12 h-12 mb-3" />
          <p className="text-white font-semibold">No Vertiqs yet</p>
          <p className="text-xs mt-1">Create your first Vertiq to get started!</p>
        </div>
      </div>

      {/* Drawer sidebar */}
      {showSettings && (
        <>
          <div
            className="absolute inset-0 z-40 bg-black/60 transition-opacity duration-300"
            onClick={() => setShowSettings(false)}
          />
          <div
            className="absolute right-0 top-0 bottom-0 z-50 w-[82%] max-w-[340px] bg-white h-full overflow-y-auto p-5"
            style={{ animation: 'slideInRight 0.3s ease-out' }}
          >
            <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-black">Menu</h2>
              <button onClick={() => setShowSettings(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center active:scale-90 transition-transform">
                <span className="text-lg text-gray-500">✕</span>
              </button>
            </div>

            <div className="space-y-4">
              <SidebarItem icon={<Wallet className="w-6 h-6 text-[#8A2BE2]" />} label="My Wallet" onClick={() => closeDrawerAndNavigate('#/balance')} />
              <SidebarItem icon={<QrCode className="w-6 h-6 text-[#8A2BE2]" />} label="My QR Code" onClick={() => closeDrawerAndNavigate('#/qr-code')} />
              <SidebarItem icon={<Rocket className="w-6 h-6 text-[#8A2BE2]" />} label="Vertiq Boost" onClick={() => closeDrawerAndNavigate('#/promote')} />
              <SidebarItem icon={<Settings className="w-6 h-6 text-[#8A2BE2]" />} label="App Settings" onClick={() => closeDrawerAndNavigate('#/settings-privacy')} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SidebarItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 py-4 px-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
    >
      {icon}
      <span className="font-semibold text-[15px] text-black">{label}</span>
      <span className="ml-auto text-gray-300 text-lg">›</span>
    </button>
  );
}
