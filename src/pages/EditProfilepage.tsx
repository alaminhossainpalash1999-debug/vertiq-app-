import { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';

const BIO_MAX = 150;

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
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-4 pt-6 pb-3 border-b border-[#E5E7EB] flex items-center gap-3">
        <button onClick={() => window.history.back()} className="text-gray-400 hover:text-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Edit Vertiq Profile</h1>
      </div>

      <div className="max-w-[600px] mx-auto px-6 py-4">
        {/* Avatar */}
        <div className="flex flex-col items-center py-8 border-b border-[#E5E7EB]">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#FF69B4] flex items-center justify-center text-4xl font-black text-white overflow-hidden">
              {img ? <img src={img} className="w-full h-full object-cover" /> : 'V'}
            </div>
            <label className="absolute -bottom-1 -right-1 w-9 h-9 bg-[#8A2BE2] rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-white active:scale-90 transition-transform">
              <Camera className="w-4 h-4 text-white" />
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
          <p className="text-gray-400 text-xs mt-3">Tap to add your Vertiq avatar</p>
        </div>

        {/* Name */}
        <div className="py-5 border-b border-[#E5E7EB]">
          <label className="text-xs text-gray-500 font-medium">Your display name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={30}
            className="w-full mt-1.5 bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8A2BE2] transition-colors"
          />
        </div>

        {/* Username */}
        <div className="py-5 border-b border-[#E5E7EB]">
          <label className="text-xs text-gray-500 font-medium">Username</label>
          <div className="flex items-center mt-1.5 bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 focus-within:border-[#8A2BE2] transition-colors">
            <span className="text-[#8A2BE2] text-sm font-medium">@</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
              placeholder="vertiq_username"
              maxLength={20}
              className="flex-1 bg-transparent text-sm outline-none ml-0.5"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="py-5 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-500 font-medium">Bio</label>
            <span className={`text-xs ${bio.length > BIO_MAX - 20 ? 'text-[#FF3B30]' : 'text-gray-400'}`}>
              {bio.length}/{BIO_MAX}
            </span>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
            placeholder="Write your Vertiq bio ✨"
            rows={3}
            className="w-full mt-1.5 bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8A2BE2] transition-colors resize-none"
          />
        </div>

        {/* Link */}
        <div className="py-5">
          <label className="text-xs text-gray-500 font-medium">Link</label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Add your website or social link"
            type="url"
            className="w-full mt-1.5 bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8A2BE2] transition-colors"
          />
        </div>

        {/* Bottom buttons */}
        <div className="flex justify-end gap-3 mt-6 pb-8">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 border border-gray-300 rounded-full font-medium text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2.5 bg-[#8A2BE2] text-white rounded-full font-bold text-sm active:scale-95 transition-transform hover:bg-[#7B1ED0]"
          >
            {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#8A2BE2] text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg z-50">
          Profile saved successfully
        </div>
      )}
    </div>
  );
}
