import { ChevronRight, ArrowLeft, User, Shield, Ban, Globe, HelpCircle, BookOpen, Info, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Section {
  label: string;
  items: { title: string; hash?: string; icon: React.ReactNode; danger?: boolean }[];
}

const sections: Section[] = [
  {
    label: 'ACCOUNT',
    items: [
      { title: 'Account', hash: '#/settings/account', icon: <User className="w-5 h-5" /> },
      { title: 'Privacy', hash: '#/settings/privacy', icon: <Shield className="w-5 h-5" /> },
      { title: 'Blocked accounts', hash: '#/settings/blocked', icon: <Ban className="w-5 h-5" /> },
    ],
  },
  {
    label: 'APP',
    items: [
      { title: 'App language', hash: '#/language', icon: <Globe className="w-5 h-5" />, },
    ],
  },
  {
    label: 'SUPPORT & ABOUT',
    items: [
      { title: 'Help Center', hash: '#/settings/help', icon: <HelpCircle className="w-5 h-5" /> },
      { title: 'Community Guidelines', hash: '#/settings/guidelines', icon: <BookOpen className="w-5 h-5" /> },
      { title: 'About Vertiq', hash: '#/settings/about', icon: <Info className="w-5 h-5" /> },
    ],
  },
  {
    label: 'LOGIN',
    items: [
      { title: 'Log out', hash: '#/settings/logout', icon: <LogOut className="w-5 h-5" />, danger: true },
    ],
  },
];

export default function SettingsAndPrivacy() {
  const { signOut } = useAuth();

  function handleItem(item: Section['items'][0]) {
    if (item.title === 'Log out') {
      signOut();
      return;
    }
    if (item.hash) window.location.hash = item.hash;
  }

  return (
    <div className="min-h-screen bg-white text-black pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-[#E5E7EB] flex items-center gap-3">
        <button onClick={() => window.history.back()} className="text-gray-400 hover:text-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Vertiq Settings</h1>
      </div>

      {/* Sections */}
      <div className="px-4 py-4 space-y-5">
        {sections.map((section) => (
          <div key={section.label}>
            <h2 className="text-xs font-bold tracking-wide text-gray-400 mb-2 px-1">{section.label}</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={item.title}
                  onClick={() => handleItem(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left ${
                    i < section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className={item.danger ? 'text-[#FF3B30]' : 'text-[#8A2BE2]'}>{item.icon}</span>
                  <span className={`text-sm font-medium flex-1 ${item.danger ? 'text-[#FF3B30]' : 'text-black'}`}>
                    {item.title}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-xs text-gray-300 pt-2">VERTIQ v1.0</p>
      </div>
    </div>
  );
}
