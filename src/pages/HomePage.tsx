import FeedPage from "./FeedPage";

export default function HomePage() {
  return (
    <div className="relative w-full h-screen bg-black">
      {/* Top Tabs - For You | Following */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center gap-6 pt-12 text-white text-[16px] font-semibold">
        <button className="opacity-60">Following</button>
        <button className="border-b-2 border-white pb-1">For You</button>
      </div>

      {/* Your Existing Feed */}
      <FeedPage />

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/90 flex justify-around py-3 text-white text-xs">
        <span className="font-bold">🏠 Home</span>
        <span className="opacity-60">🔍 Discover</span>
        <span className="opacity-60">➕</span>
        <span className="opacity-60">📥 Inbox</span>
        <span className="opacity-60">👤 Me</span>
      </div>
    </div>
  );
}