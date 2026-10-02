import { useState } from 'react';

export default function EditProfilePage() {
  const [img, setImg] = useState<string | null>(null);
  const [username, setUsername] = useState(() => localStorage.getItem('edit_username') || '');
  const [bio, setBio] = useState(() => localStorage.getItem('edit_bio') || '');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    localStorage.setItem('edit_username', username);
    localStorage.setItem('edit_bio', bio);
    if (img) localStorage.setItem('edit_avatar', img);
    setSaved(true);
    setTimeout(() => {
      window.location.hash = '#/me';
    }, 800);
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="h-[60px] flex items-center px-4 border-b border-white/10">
        <button onClick={() => window.location.hash = '#/me'} className="text-2xl mr-4">←</button>
        <h1 className="text-xl font-bold">Edit profile</h1>
      </div>

      <div className="max-w-[600px] mx-auto p-6">
        {/* Profile Photo */}
        <div className="flex py-6 border-b border-white/10">
          <div className="w-[120px] font-semibold pt-6">Profile photo</div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#00FF88] to-[#0088FF] flex items-center justify-center text-5xl font-bold text-black overflow-hidden">
                {img ? <img src={img} className="w-full h-full object-cover" /> : (username?.[0]?.toUpperCase() || '?')}
              </div>
              <label className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-[#121212]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
                <input type="file" hidden accept="image/*" onChange={(e) => {
                  const file = (e.target as any).files[0];
                  if (file) setImg(URL.createObjectURL(file));
                }} />
              </label>
            </div>
          </div>
        </div>

        {/* Username */}
        <div className="flex py-6 border-b border-white/10">
          <div className="w-[120px] font-semibold">Username</div>
          <div className="flex-1">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full max-w-[360px] bg-[#2f2f2f] rounded px-3 py-2 outline-none focus:bg-[#3a3a3a] transition-colors"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex py-6">
          <div className="w-[120px] font-semibold">Bio</div>
          <div className="flex-1">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell something about yourself"
              className="w-full max-w-[360px] h-[100px] bg-[#2f2f2f] rounded px-3 py-2 outline-none focus:bg-[#3a3a3a] transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={() => window.location.hash = '#/me'} className="px-6 py-2 bg-[#2f2f2f] rounded">Cancel</button>
          <button onClick={handleSave} className="px-8 py-2 bg-white text-black rounded font-bold">
            {saved ? 'Saved!' : 'Save'}
          </button>
        </div>

        {saved && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#00FF88] text-black px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg">
            Profile saved successfully
          </div>
        )}
      </div>
    </div>
  );
}
