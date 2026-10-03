import { ArrowLeft, Wallet, Coins, TrendingUp, Shield, Gift, BarChart3, Star } from 'lucide-react';

export default function wallet Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center gap-3">
        <button onClick={() => window.location.hash = '#/me'} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Wallet</h1>
      </div>

      <div className="px-4 py-6">
        <div className="text-center">
          <p className="text-gray-500 text-sm">my wallet</p>
          <h1 className="text-[48px] font-black mt-2">$0.00</h1>
          <div className="mt-4 inline-flex items-center gap-3 bg-white/10 rounded-full px-5 py-2.5">
            <span className="flex items-center gap-1.5 text-sm"><diamonds className="w-4 h-4 text-[#FFD700]" /> Diamonds <b>0</b>
            <span className="w-px h-5 bg-white/20" />
            <button className="text-[#00FF88] font-bold text-sm">Get Diamonds →</button>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 mt-6 border border-white/10 flex items-center justify-between">
          <p className="font-bold text-base">Transactions</p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div><p>Exchange of diamonds</p><p>$0.00</p></div>
            <span>›</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#00FF88]/20 to-[#0088FF]/20 rounded-xl p-4 mt-3 border border-white/10 flex justify-between items-center">
          <div>
            <p className="font-bold text-base">First recharge offer</p>
            <p className="text-gray-400 text-sm mt-0.5">Get Gifts and bonus diamonds</p>
          </div>
          <div className="w-14 h-14 bg-[#00FF88]/20 rounded-full flex items-center justify-center">
            <Gift className="w-7 h-7 text-[#00FF88]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2"><TrendingUp className="w-6 h-6 text-[#00FF88]" /></div>
            <p className="font-semibold text-sm">LIVE rewards</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2"><BarChart3 className="w-6 h-6 text-[#0088FF]" /></div>
            <p className="font-semibold text-sm">Monetization</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2"><Shield className="w-6 h-6 text-white" /></div>
            <p className="font-semibold text-sm">Campaigns</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2"><Star className="w-6 h-6 text-[#FFD700]" /></div>
            <p className="font-semibold text-sm">Subscriptions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
