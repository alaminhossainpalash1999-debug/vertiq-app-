import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { X, Music, RefreshCw, ZapOff, Timer, LayoutGrid, Maximize2, UserPlus, ChevronDown, ArrowLeft } from 'lucide-react';

export function UploadPage() {
  const { user } = useAuth();
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) {
      if (!selected.type.startsWith('video/')) {
        setError('Please select a video file.');
        return;
      }
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setError(null);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file ||!user) return;
    setUploading(true);
    setError(null);
    try {
      const ext = file.name.split('.').pop()?? 'mp4';
      const filePath = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('videos').upload(filePath, file, { contentType: file.type });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('videos').getPublicUrl(filePath);
      const videoUrl = data.publicUrl;
      const { error: insertError } = await supabase.from('videos').insert({ user_id: user.id, video_url: videoUrl, caption });
      if (insertError) throw insertError;
      setSuccess(true);
      setTimeout(() => { window.location.hash = '#/'; }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  if (file && previewUrl) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="flex items-center gap-3 py-4"><a href="#/"><ArrowLeft /></a><h1 className="font-bold">Upload Video</h1></div>
        <form onSubmit={handleUpload} className="space-y-4">
          <video src={previewUrl} controls className="w-full max-w-[300px] mx-auto rounded-xl aspect-[9/16]" />
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write a caption..." rows={3} maxLength={300} className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white" />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button type="submit" disabled={uploading} className="w-full bg-white text-black font-bold py-3.5 rounded-full">
            {uploading? 'Uploading...' : 'Post'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col">
      <div className="flex justify-between items-center p-4 z-10 absolute top-0 w-full">
        <a href="#/"><X size={28} /></a>
        <div className="bg-[#3a3a3a]/80 px-5 py-2.5 rounded-full flex items-center gap-2"><Music size={18} className="fill-white" /><span className="font-semibold text-sm">Add sound</span></div>
        <div className="w-8"></div>
      </div>

      <div className="absolute right-3 top-20 z-10 flex flex-col items-center gap-6">
        <RefreshCw size={26} /><ZapOff size={26} /><div className="w-6 h-[1px] bg-white/30"></div><Timer size={26} /><LayoutGrid size={26} /><Maximize2 size={24} />
        <div className="relative"><UserPlus size={26} /><div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">V</div></div><ChevronDown size={26} />
      </div>

      <div className="flex-1 bg-[#111] relative flex items-center justify-center">
        <p className="text-white/30 text-sm">Camera Preview</p>
        <div className="absolute bottom-28 w-full flex justify-center items-end gap-4 px-2">
          <span className="text-white/50 font-bold text-sm mb-2">10m</span><span className="text-white/50 font-bold text-sm mb-2">60s</span><span className="text-white/50 font-bold text-sm mb-2">15s</span><span className="bg-white text-black px-4 py-1 rounded-full font-bold text-sm">PHOTO</span><span className="text-white/50 font-bold text-sm mb-2">TEXT</span>
        </div>

        <div className="absolute bottom-8 w-full flex justify-between items-center px-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white"><img src="https://i.pravatar.cc/100?img=11" className="w-full h-full" /></div>
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white"><img src="https://picsum.photos/100" className="w-full h-full" /></div>
          <div onClick={() => inputRef.current?.click()} className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center cursor-pointer">
            <div className="w-[68px] h-[68px] bg-white rounded-full"></div>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white bg-white flex items-center justify-center"><div className="grid grid-cols-2 gap-1"><div className="w-3 h-3 bg-black rounded-full"></div><div className="w-3 h-3 bg-black rounded-full"></div><div className="w-3 h-3 bg-black rounded-full"></div><div className="w-3 h-3 bg-black rounded-full"></div></div></div>
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white"><img src="https://i.pravatar.cc/100?img=5" className="w-full h-full" /></div>
        </div>
      </div>

      <input ref={inputRef} type="file" accept="video/*" onChange={handleFileChange} className="hidden" />

      <div className="bg-black h-16 flex items-center justify-around px-6 border-t border-white/10">
        <div className="w-8 h-10 bg-white rounded-md opacity-60"></div>
        <span className="text-white/50 font-bold text-sm">LIVE</span><span className="text-white font-bold text-base">CAMERA</span><span className="text-white/50 font-bold text-sm">CREATE</span>
      </div>
    </div>
  );
}
