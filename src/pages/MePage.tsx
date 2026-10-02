import { useState } from "react";

export default function MePage() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <div className="h-[60px] flex items-center justify-between px-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.hash = '#/'} className="text-2xl">←</button>
          <h1 className="text-[18px] font-bold">Edit Profile</h1>
        </div>
        <button onClick={() => setShowSettings(true)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">⚙️</button>
      </div>

      <div className="flex flex-col items-center pt-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center text-3xl font-bold text-black">?</div>
        <h2 className="mt-4 text-[18px] font-bold">@me</h2>
        <p className="text-white/60 text-sm">No bio yet</p>
        <div className="flex gap-8 mt-6">
          <div className="text-center"><p className="font-bold text-[18px]">0</p><p className="text-white/60 text-xs">Following</p></div>
          <div className="text-center"><p className="font-bold text-[18px]">0</p><p className="text-white/60 text-xs">Followers</p></div>
          <div className="text-center"><p className="font-bold text-[18px]">0</p><p className="text-white/60 text-xs">Likes</p></div>
        </div>
        <div className="mt-20 flex flex-col items-center text-white/50">
          <div className="text-4xl mb-3">👜</div>
          <p className="text-white font-semibold">No videos yet</p>
          <p className="text-xs mt-1">Upload your first video to see it here!</p>
        </div>
      </div>

      {showSettings && (
        <div className="absolute inset-0 z-50 flex justify-end">
          <div className="flex-1 bg-black/60" onClick={() => setShowSettings(false)}></div>
          <div className="w-[82%] max-w-[340px] bg-white text-black h-full p-5 overflow-y-auto">
            <div>
              <p className="text-[14px] text-black/40 mb-2">Assets</p>
              <div onClick={() => window.location.hash = '#/balance'} className="flex items-center justify-between py-3 cursor-pointer">
                <div className="flex items-center gap-3"><span className="text-[20px]">💳</span><span className="font-bold text-[16px]">Balance</span></div>
                <span className="text-black/30 text-xl">{'>'}</span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4">
              <p className="text-[14px] text-black/40 mb-2">Personal tools</p>
              <div onClick={() => window.location.hash = '#/activity-center'} className="flex items-center justify-between py-3"><div className="flex items-center gap-3"><span className="text-[20px]">🕒</span><span className="font-bold text-[16px]">Activity center</span></div><span className="text-black/30 text-xl">{'>'}</span></div>
              <div className="flex items-center justify-between py-3"><div className="flex items-center gap-3"><span className="text-[20px]">📥</span><span className="font-bold text-[16px]">Offline videos</span></div><span className="text-black/30 text-xl">{'>'}</span></div>
              <div onClick={() => window.location.hash = '#/qr-code'} className="flex items-center justify-between py-3"><div className="flex items-center gap-3"><span className="text-[20px]">🔳</span><span className="font-bold text-[16px]">Your QR code</span></div><span className="text-black/30 text-xl">{'>'}</span></div>
            </div>

            <div className="border-t mt-4 pt-4">
              <p className="text-[14px] text-black/40 mb-2">Creation & business tools</p>
              <div onClick={() => window.location.hash = '#/promote'} className="flex items-center justify-between py-3 cursor-pointer"><div className="flex items-center gap-3"><span className="text-[20px]">🎬</span><span className="font-bold text-[16px]"></span></div><span className="text-black/30 text-xl">{'>'}</span></div>
              <div className="flex items-center justify-between py-3"><div className="flex items-center gap-3"><span className="text-[20px]">🔥</span><span className="font-bold text-[16px]">Promote</span></div><span className="text-black/30 text-xl">{'>'}</span></div>
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex items-center justify-between py-3"><div className="flex items-center gap-3"><span className="text-[20px]">⚙️</span><span className="font-bold text-[16px]">Settings and privacy</span></div><span className="text-black/30 text-xl">{'>'}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
