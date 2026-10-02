import { useState } from "react";
import { Settings, ArrowLeft, Wallet, Clock, Download, QrCode, Flame, Video, BarChart3 } from "lucide-react";

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
  const storedUsername = localStorage.getItem('edit_username') || '';
  const storedBio = localStorage.getItem('edit_bio') || '';
  const storedAvatar = localStorage.getItem('edit_avatar');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="h-[60px] flex items-center justify-between px-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.hash = '#/'} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-bold">Me</h1>
        </div>
        <button onClick={() => setShowSettings(true)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col items-center pt-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00FF88] to-[#0088FF] flex items-center justify-center text-3xl font-bold text-black overflow-hidden">
          {storedAvatar ? <img src={storedAvatar} className="w-full h-full object-cover" /> : (storedUsername?.[0]?.toUpperCase() || '?')}
        </div>
        <h2 className="mt-4 text-[18px] font-bold">@{storedUsername || 'me'}</h2>
        {storedName && <p className="text-white/80 text-sm mt-0.5">{storedName}</p>}
        <p className="text-white/60 text-sm mt-0.5">{storedBio || 'No bio yet'}</p>
        <div className="flex gap-8 mt-6">
          <div className="text-center"><p className="font-bold text-[18px]">0</p><p className="text-white/60 text-xs">Following</p></div>
          <div className="text-center"><p className="font-bold text-[18px]">0</p><p className="text-white/60 text-xs">Followers</p></div>
          <div className="text-center"><p className="font-bold text-[18px]">0</p><p className="text-white/60 text-xs">Likes</p></div>
        </div>
        <button
          onClick={() => closeDrawerAndNavigate('#/edit-profile')}
          className="mt-6 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-2.5 rounded-lg transition-colors text-sm"
        >
          Edit Profile
        </button>
        <div className="mt-12 flex flex-col items-center text-white/50">
          <div className="text-4xl mb-3"><Video className="w-12 h-12" /></div>
          <p className="text-white font-semibold">No videos yet</p>
          <p className="text-xs mt-1">Upload your first video to see it here!</p>
        </div>
      </div>

      {/* Drawer overlay */}
      {showSettings && (
        <>
          <div
            className="absolute inset-0 z-40 bg-black/60 transition-opacity duration-300"
            onClick={() => setShowSettings(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 z-50 w-[82%] max-w-[340px] bg-[#1a1a1a] text-white h-full overflow-y-auto transition-transform duration-300 ease-out"
            style={{ animation: 'slideInRight 0.3s ease-out' }}
          >
            <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold">Settings</h2>
                <button onClick={() => setShowSettings(false)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center active:scale-90 transition-transform">
                  <span className="text-lg">✕</span>
                </button>
              </div>

              {/* Assets */}
              <p className="text-[13px] text-gray-500 font-medium mb-2">Assets</p>
              <div className="space-y-1 mb-5">
                <DrawerItem icon={<Wallet className="w-5 h-5" />} label="Balance" onClick={() => closeDrawerAndNavigate('#/balance')} />
              </div>

              {/* Personal tools */}
              <div className="border-t border-white/10 pt-4 mb-5">
                <p className="text-[13px] text-gray-500 font-medium mb-2">Personal tools</p>
                <div className="space-y-1">
                  <DrawerItem icon={<Clock className="w-5 h-5" />} label="Activity center" onClick={() => closeDrawerAndNavigate('#/activity-center')} />
                  <DrawerItem icon={<Download className="w-5 h-5" />} label="Offline videos" onClick={() => closeDrawerAndNavigate('#/offline-videos')} />
                  <DrawerItem icon={<QrCode className="w-5 h-5" />} label="Your QR code" onClick={() => closeDrawerAndNavigate('#/qr-code')} />
                </div>
              </div>

              {/* Creation & business tools */}
              <div className="border-t border-white/10 pt-4 mb-5">
                <p className="text-[13px] text-gray-500 font-medium mb-2">Creation & business tools</p>
                <div className="space-y-1">
                  <DrawerItem icon={<BarChart3 className="w-5 h-5" />} label="Creator tools" onClick={() => closeDrawerAndNavigate('#/creator-tools')} />
                  <DrawerItem icon={<Flame className="w-5 h-5" />} label="Promote" onClick={() => closeDrawerAndNavigate('#/promote')} />
                </div>
              </div>

              {/* Settings */}
              <div className="border-t border-white/10 pt-4">
                <div className="space-y-1">
                  <DrawerItem icon={<Settings className="w-5 h-5" />} label="Settings and privacy" onClick={() => closeDrawerAndNavigate('#/settings-privacy')} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DrawerItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors text-left"
    >
      <span className="text-gray-400">{icon}</span>
      <span className="font-medium text-[15px]">{label}</span>
      <span className="ml-auto text-gray-600 text-lg">›</span>
    </button>
  );
}
