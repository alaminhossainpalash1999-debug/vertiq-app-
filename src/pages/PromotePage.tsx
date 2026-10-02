export default function PromotePage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => history.back()} className="text-2xl">←</button>
        <h1 className="font-bold text-xl mx-auto">Promote</h1>
        <div className="w-6"></div>
      </div>

      <div className="flex gap-8 border-b mb-4">
        <span className="border-b-2 border-black pb-2 font-bold">Create</span>
        <span className="text-gray-500">Dashboard</span>
        <span className="text-gray-500">Mine</span>
      </div>

      <div className="bg-white rounded-xl p-4">
        <h2 className="font-bold mb-4">Choose your goal</h2>
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-pink-50 text-pink-500 border border-pink-200 rounded-lg text-sm">Boost account</span>
          <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">Get sales</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center"><span>❤️ More likes & comments</span><div className="w-5 h-5 rounded-full border-2 border-pink-500 flex items-center justify-center"><div className="w-2 h-2 bg-pink-500 rounded-full"></div></div></div>
          <div className="flex justify-between items-center"><span>▶️ More video views</span><div className="w-5 h-5 rounded-full border"></div></div>
          <div className="flex justify-between items-center"><span>👤 More followers</span><div className="w-5 h-5 rounded-full border"></div></div>
          <div className="flex justify-between items-center"><span>👁️ More profile views</span><div className="w-5 h-5 rounded-full border"></div></div>
        </div>
      </div>

      <div className="mt-3 bg-white rounded-xl p-4 h-64 flex items-center justify-center text-gray-400">
        
      </div>
    </div>
  )
}