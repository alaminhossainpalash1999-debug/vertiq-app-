export default function BalancePage() {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-black flex flex-col">
      <div className="h-[60px] flex items-center justify-between px-4 bg-gradient-to-b from-[#ffe6eb] to-[#f5f6f8]">
        <button onClick={() => window.history.back()} className="text-3xl">‹</button>
        <div className="text-center">
          <h1 className="text-[20px] font-bold">Balance</h1>
          <p className="text-[13px] text-black/60">🛡️ Secure</p>
        </div>
        <button className="text-2xl">⚙️</button>
      </div>
      <div className="px-4">
        <div className="text-center mt-4">
          <p className="text-black/50 text-[18px]">Estimated balance SAR 👁️</p>
          <h1 className="text-[52px] font-black mt-2">0.03 <span className="text-[30px] font-light">›</span></h1>
          <div className="mt-3 inline-flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow-sm">
            <span>Coins <b>0</b></span>
            <span className="w-[1px] h-5 bg-black/10"></span>
            <span className="text-[#ff2a55] font-bold">Get Coins →</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 mt-6 flex items-center justify-between">
          <p className="font-bold text-[18px]">Transactions</p>
          <div className="flex items-center gap-1 text-black/50 text-right"><div><p>Exchange of Coins:</p><p>USD0.02</p></div><span>›</span></div>
        </div>
        <div className="bg-white rounded-2xl p-4 mt-3 flex justify-between items-center">
          <div><p className="font-bold text-[18px]">First recharge offer ›</p><p className="text-black/50 text-sm">Get Gifts and bonus Coins</p></div>
          <div className="w-16 h-16 bg-[#ff4d6a] rounded-full flex items-center justify-center text-3xl">🎁</div>
        </div>
        <div className="bg-white rounded-2xl p-4 mt-3 grid grid-cols-3 gap-6">
          <div className="text-center"><div className="w-14 h-14 bg-[#f5f5f5] rounded-xl flex items-center justify-center mx-auto">💲</div><p className="font-bold mt-2">LIVE rewards</p></div>
          <div className="text-center"><div className="w-14 h-14 bg-[#f5f5f5] rounded-xl flex items-center justify-center mx-auto">📊</div><p className="font-bold mt-2">Monetization</p></div>
          <div className="text-center"><div className="w-14 h-14 bg-[#f5f5f5] rounded-xl flex items-center justify-center mx-auto">🛡️</div><p className="font-bold mt-2">Campaigns</p></div>
          <div className="text-center"><div className="w-14 h-14 bg-[#f5f5f5] rounded-xl flex items-center justify-center mx-auto">⭐</div><p className="font-bold mt-2">Subscription Manager</p></div>
        </div>
      </div>
    </div>
  );
}