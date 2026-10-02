import { ArrowLeft, BarChart3, Eye, Heart, Users, TrendingUp, Video, Play } from 'lucide-react';

export default function CreatorToolsPage() {
  const stats = [
    { label: 'Profile views', value: '0', icon: <Eye className="w-5 h-5" />, change: '+0%' },
    { label: 'Likes', value: '0', icon: <Heart className="w-5 h-5" />, change: '+0%' },
    { label: 'Followers', value: '0', icon: <Users className="w-5 h-5" />, change: '+0%' },
    { label: 'Video views', value: '0', icon: <Play className="w-5 h-5" />, change: '+0%' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center gap-3">
        <button onClick={() => window.location.hash = '#/me'} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Creator tools</h1>
      </div>

      <div className="px-4 py-5">
        {/* Overview card */}
        <div className="bg-gradient-to-br from-[#00FF88]/15 to-[#0088FF]/15 rounded-2xl p-5 border border-white/10 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-[#00FF88]" />
            <h2 className="font-bold text-base">Analytics overview</h2>
          </div>
          <p className="text-gray-400 text-xs mb-4">Last 28 days</p>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">{s.icon}</span>
                  <span className="text-xs text-gray-600">{s.change}</span>
                </div>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <p className="text-gray-500 font-medium text-sm mb-3">Quick actions</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center border border-white/10">
            <TrendingUp className="w-6 h-6 text-[#00FF88] mb-2" />
            <p className="text-xs font-medium text-center">Promote content</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center border border-white/10">
            <Video className="w-6 h-6 text-[#0088FF] mb-2" />
            <p className="text-xs font-medium text-center">Upload video</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center border border-white/10">
            <BarChart3 className="w-6 h-6 text-white mb-2" />
            <p className="text-xs font-medium text-center">Full report</p>
          </div>
        </div>

        {/* Recent videos */}
        <div className="mt-6">
          <p className="text-gray-500 font-medium text-sm mb-3">Recent videos</p>
          <div className="bg-white/5 rounded-xl p-8 border border-white/10 text-center">
            <Video className="w-10 h-10 mx-auto text-gray-700 mb-2" />
            <p className="text-sm text-gray-600">No videos uploaded yet</p>
            <p className="text-xs text-gray-700 mt-1">Upload your first video to see analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
