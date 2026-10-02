import { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';

const BIO_MAX = 80;

export default function EditProfilePage() {
  const [img, setImg] = useState<string | null>(() => localStorage.getItem('edit_avatar'));
  const [name, setName] = useState(() => localStorage.getItem('edit_name') || '');
  const [username, setUsername] = useState(() => localStorage.getItem('edit_username') || '');
  const [bio, setBio] = useState(() => localStorage.getItem('edit_bio') || '');
  const [link, setLink] = useState(() => localStorage.getItem('edit_link') || '');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    localStorage.setItem('edit_name', name);
    localStorage.setItem('edit_username', username);
    localStorage.setItem('edit_bio', bio);
    localStorage.setItem('edit_link', link);
    if (img) localStorage.setItem('edit_avatar', img);
    setSaved(true);
    setTimeout(() => {
      window.location.hash = '#/me';
    }, 800);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => window.history.back()} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Edit profile</h1>
        </div>
        <button
          onClick={handleSave}
          className="text-sm font-bold text-[#00FF88] hover:text-[#00DD77] transition-colors"
        >
          Save
        </button>
      </div>

      <div className="max-w-[600px] mx-auto px-6 py-4">
        {/* Avatar */}
        <div className="flex flex-col items-center py-8 border-b border-white/10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00FF88] to-[#0088FF] flex items-center justify-center text-4xl font-black text-black overflow-hidden">
              {img ? <img src={img} className="w-full h-full object-cover" /> : (username?.[0]?.toUpperCase() || '?')}
            </div>
            <label className="absolute -bottom-1 -right-1 w-9 h-9 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-black active:scale-90 transition-transform">
              <Camera className="w-4 h-4 text-black" />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) setImg(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
          <p className="text-gray-500 text-xs mt-3">Tap to change photo</p>
        </div>

        {/* Name */}
        <div className="py-5 border-b border-white/10">
          <label className="text-xs text-gray-500 font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={30}
            className="w-full mt-1.5 bg-[#1f1f1f] rounded-lg px-4 py-3 text-sm outline-none focus:bg-[#2a2a2a] transition-colors"
          />
        </div>

        {/* Username */}
        <div className="py-5 border-b border-white/10">
          <label className="text-xs text-gray-500 font-medium">Username</label>
          <div className="flex items-center mt-1.5 bg-[#1f1f1f] rounded-lg px-4 py-3 focus-within:bg-[#2a2a2a] transition-colors">
            <span className="text-gray-500 text-sm">@</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
              placeholder="username"
              maxLength={20}
              className="flex-1 bg-transparent text-sm outline-none ml-0.5"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="py-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-500 font-medium">Bio</label>
            <span className={`text-xs ${bio.length > BIO_MAX - 10 ? 'text-[#FF2D55]' : 'text-gray-600'}`}>
              {bio.length}/{BIO_MAX}
            </span>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
            placeholder="Tell something about yourself"
            rows={3}
            className="w-full mt-1.5 bg-[#1f1f1f] rounded-lg px-4 py-3 text-sm outline-none focus:bg-[#2a2a2a] transition-colors resize-none"
          />
        </div>

        {/* Link */}
        <div className="py-5">
          <label className="text-xs text-gray-500 font-medium">Link</label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            type="url"
            className="w-full mt-1.5 bg-[#1f1f1f] rounded-lg px-4 py-3 text-sm outline-none focus:bg-[#2a2a2a] transition-colors"
          />
        </div>

        {/* Bottom buttons */}
        <div className="flex justify-end gap-3 mt-6 pb-8">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 bg-white/10 rounded-lg font-medium text-sm hover:bg-white/15 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2.5 bg-white text-black rounded-lg font-bold text-sm active:scale-95 transition-transform"
          >
            {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#00FF88] text-black px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg z-50">
          Profile saved successfully
        </div>
      )}
    </div>
  );
}
