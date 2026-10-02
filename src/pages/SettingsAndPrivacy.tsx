import { ChevronRight } from 'lucide-react';
export default function SettingsAndPrivacy() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <div className="bg-white p-4 text-center font-bold text-xl">Settings and privacy</div>
      <div className="p-3">
        <p className="text-gray-500 text-sm px-2 py-2">Visibility</p>
        <div className="bg-white rounded-lg">
          <div className="flex justify-between p-4 border-b">Private account <ChevronRight size={18}/></div>
          <div className="flex justify-between p-4">Blocked accounts <ChevronRight size={18}/></div>
        </div>
        <p className="text-gray-500 text-sm px-2 py-2 mt-4">Interactions</p>
        <div className="bg-white rounded-lg">
          <div className="flex justify-between p-4 border-b">Comments <ChevronRight size={18}/></div>
          <div className="flex justify-between p-4 border-b">Mentions <ChevronRight size={18}/></div>
          <div className="flex justify-between p-4 border-b">Direct messages <ChevronRight size={18}/></div>
          <div className="flex justify-between p-4 border-b">Reuse of content <ChevronRight size={18}/></div>
          <div className="flex justify-between p-4 border-b">Display profile when sharing links <span className="text-gray-400">On <ChevronRight size={18} className="inline"/></span></div>
          <div className="flex justify-between p-4 border-b">Downloads <span className="text-gray-400">Off <ChevronRight size={18} className="inline"/></span></div>
          <div className="flex justify-between p-4 border-b">Following list <span className="text-gray-400">Only you <ChevronRight size={18} className="inline"/></span></div>
          <div className="flex justify-between p-4 border-b">Liked videos <span className="text-gray-400">Only you <ChevronRight size={18} className="inline"/></span></div>
          <div className="flex justify-between p-4 border-b bg-white" onClick={()=>window.location.hash='#/language'} style={{cursor:'pointer'}}>
  <span>App Language</span> 
  <span className="text-gray-400">English <ChevronRight size={18} className="inline"/></span>
</div>
          <div className="flex justify-between p-4">Viewers <span className="text-gray-400">On <ChevronRight size={18} className="inline"/></span></div>
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">v47.1.4</p>
      </div>
    </div>
  );
}