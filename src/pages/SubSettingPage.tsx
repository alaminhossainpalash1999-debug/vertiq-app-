import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Props {
  title: string;
  items?: { title: string; hash?: string; value?: string }[];
  showLogout?: boolean;
}

export default function SubSettingPage({ title, items = [], showLogout = false }: Props) {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center gap-3">
        <button onClick={() => window.history.back()} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>

      <div className="px-4 py-4">
        {items.length > 0 && (
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            {items.map((item, i) => (
              <button
                key={item.title}
                onClick={() => item.hash && (window.location.hash = item.hash)}
                className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors text-left ${
                  i < items.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <span className="text-sm font-medium">{item.title}</span>
                <div className="flex items-center gap-2">
                  {item.value && <span className="text-xs text-gray-500">{item.value}</span>}
                  {item.hash && <ChevronRight className="w-4 h-4 text-gray-600" />}
                </div>
              </button>
            ))}
          </div>
        )}

        {items.length === 0 && !showLogout && (
          <div className="text-center py-16 text-gray-600">
            <p className="text-sm">No settings available yet</p>
          </div>
        )}

        {showLogout && (
          <button
            onClick={() => signOut()}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3.5 bg-red-500/10 text-red-400 rounded-xl font-medium text-sm hover:bg-red-500/20 transition-colors"
          >
            Log out of Vertiq
          </button>
        )}
      </div>
    </div>
  );
}
