import { ArrowLeft, Bell, MessageSquare } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';

export default function InboxPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center gap-3">
        <button onClick={() => window.location.hash = '#/'} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Inbox</h1>
      </div>

      <div className="px-4 py-4 space-y-3">
        <button
          onClick={() => window.location.hash = '#/notifications'}
          className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-[#FF2D55]/20 flex items-center justify-center">
            <Bell className="w-6 h-6 text-[#FF2D55]" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm">Notifications</p>
            <p className="text-xs text-gray-500">Activity on your content</p>
          </div>
        </button>

        <button
          onClick={() => window.location.hash = '#/messages'}
          className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-[#0088FF]/20 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[#0088FF]" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm">Messages</p>
            <p className="text-xs text-gray-500">Direct messages</p>
          </div>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-gray-600">
        <p className="text-sm">No new activity</p>
      </div>

      <BottomNav current="inbox" />
    </div>
  );
}
