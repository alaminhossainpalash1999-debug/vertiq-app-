import { ArrowLeft, PlayCircle, MessageCircle, Search, BadgeInfo, User, AtSign, FileStack, Settings, ChevronRight } from 'lucide-react';

export default function ActivityCenterPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => window.history.back()} className="p-2">
          <ArrowLeft size={28} />
        </button>
        <button onClick={() => window.location.hash = '#/settings'} className="p-2">
          <Settings size={28} />
        </button>
      </div>

      <div className="px-6 pb-6">
        <h1 className="text-[36px] font-black tracking-tight mb-6">Activity center</h1>

        <p className="text-gray-500 font-medium mb-3">Your activity</p>
        <div className="bg-white rounded-[24px] p-2 mb-8 shadow-sm">
          <Item icon={<PlayCircle />} text="Watch history" onClick={() => window.location.hash = '#/watch-history'} />
          <Item icon={<MessageCircle />} text="Comments" onClick={() => window.location.hash = '#/comments'} />
          <Item icon={<Search />} text="Searches" onClick={() => window.location.hash = '#/searches'} />
          <Item icon={<ADIcon />} text="Ads activity" />
          <Item icon={<User />} text="Account" />
        </div>

        <p className="text-gray-500 font-medium mb-3">Interactions with you</p>
        <div className="bg-white rounded-[24px] p-2 shadow-sm">
          <Item icon={<AtSign />} text="Mentions" />
          <Item icon={<FileStack />} text="Reuses of your content" />
        </div>
      </div>
    </div>
  );
}

function Item({ icon, text, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-7 h-7 flex items-center justify-center">{icon}</div>
        <span className="text-[18px] font-medium">{text}</span>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </button>
  );
}

function ADIcon() {
  return <div className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold">AD</div>
}