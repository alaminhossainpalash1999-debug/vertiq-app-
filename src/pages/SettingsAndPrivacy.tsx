import { ChevronRight, ArrowLeft } from 'lucide-react';

interface Section {
  label: string;
  items: { title: string; hash?: string; value?: string }[];
}

const sections: Section[] = [
  {
    label: 'Activity',
    items: [
      { title: 'Activity center', hash: '#/settings/activity-center' },
      { title: 'Your activity', hash: '#/settings/your-activity' },
    ],
  },
  {
    label: 'Account',
    items: [
      { title: 'Account', hash: '#/settings/account' },
      { title: 'Privacy', hash: '#/settings/privacy' },
      { title: 'Blocked accounts', hash: '#/settings/blocked' },
    ],
  },
  {
    label: 'Visibility',
    items: [
      { title: 'Private account', hash: '#/settings/private', value: 'Off' },
      { title: 'Profile view', hash: '#/settings/profile-view', value: 'Everyone' },
    ],
  },
  {
    label: 'Interactions',
    items: [
      { title: 'Comments', hash: '#/settings/comments' },
      { title: 'Mentions', hash: '#/settings/mentions' },
      { title: 'Direct messages', hash: '#/settings/dm' },
      { title: 'Reuse of content', hash: '#/settings/reuse' },
      { title: 'Downloads', hash: '#/settings/downloads', value: 'Off' },
      { title: 'Following list', hash: '#/settings/following-list', value: 'Only you' },
      { title: 'Liked videos', hash: '#/settings/liked-videos', value: 'Only you' },
    ],
  },
  {
    label: 'Content & Display',
    items: [
      { title: 'App language', hash: '#/language', value: 'English' },
      { title: 'Content preferences', hash: '#/settings/content-prefs' },
      { title: 'Viewers', hash: '#/settings/viewers', value: 'On' },
    ],
  },
  {
    label: 'Cache & Cellular',
    items: [
      { title: 'Data Saver', hash: '#/settings/data-saver', value: 'Off' },
      { title: 'Clear cache', hash: '#/settings/clear-cache' },
    ],
  },
  {
    label: 'Support & About',
    items: [
      { title: 'Help Center', hash: '#/settings/help' },
      { title: 'Community Guidelines', hash: '#/settings/guidelines' },
      { title: 'About Vertiq', hash: '#/settings/about' },
    ],
  },
  {
    label: 'Login',
    items: [
      { title: 'Log out', hash: '#/settings/logout' },
    ],
  },
];

export default function SettingsAndPrivacy() {
  function go(hash: string) {
    window.location.hash = hash;
  }

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center gap-3">
        <button onClick={() => window.history.back()} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Settings and privacy</h1>
      </div>

      {/* Sections */}
      <div className="px-4 py-3 space-y-5">
        {sections.map((section) => (
          <div key={section.label}>
            <h2 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 px-1">{section.label}</h2>
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={item.title}
                  onClick={() => item.hash && go(item.hash)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors text-left ${
                    i < section.items.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-xs text-gray-500">{item.value}</span>}
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-xs text-gray-700 pt-2">VERTIQ v1.0</p>
      </div>
    </div>
  );
}
