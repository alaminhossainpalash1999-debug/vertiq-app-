import { useState } from 'react';

export default function EditProfilePage(){
  const [img, setImg] = useState<string | null>(null);

  return(
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="h-[60px] flex items-center px-4 border-b border-white/10">
        <button onClick={()=>window.location.hash='#/me'} className="text-2xl mr-4">←</button>
        <h1 className="text-xl font-bold">Edit profile</h1>
      </div>

      <div className="max-w-[600px] mx-auto p-6">
        {/* Profile Photo + ICON - এইটাই মেইন */}
        <div className="flex py-6 border-b border-white/10">
          <div className="w-[120px] font-semibold pt-6">Profile photo</div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-[#84ff00] flex items-center justify-center text-5xl font-bold text-black overflow-hidden">
                {img? <img src={img} className="w-full h-full object-cover" /> : 'm'}
              </div>

              {/* ছবি চেঞ্জ করার আইকন - এইটা এখন আসবে */}
              <label className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-[#121212]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
                <input type="file" hidden accept="image/*" onChange={(e)=>{
                  const file = (e.target as any).files[0];
                  if(file) setImg(URL.createObjectURL(file));
                }} />
              </label>

            </div>
          </div>
        </div>

        <div className="flex py-6 border-b border-white/10">
          <div className="w-[120px] font-semibold">Username</div>
          <div className="flex-1">
            <input defaultValue="user4051996608" className="w-full max-w-[360px] bg-[#2f2f2f] rounded px-3 py-2 outline-none" />
          </div>
        </div>

        <div className="flex py-6 border-b border-white/10">
          <div className="w-[120px] font-semibold">Name</div>
          <div className="flex-1">
            <input defaultValue="mim" className="w-full max-w-[360px] bg-[#2f2f2f] rounded px-3 py-2 outline-none" />
          </div>
        </div>

        <div className="flex py-6">
          <div className="w-[120px] font-semibold">Bio</div>
          <div className="flex-1">
            <textarea defaultValue="hiklohf" className="w-full max-w-[360px] h-[100px] bg-[#2f2f2f] rounded px-3 py-2 outline-none"></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={()=>window.location.hash='#/me'} className="px-6 py-2 bg-[#2f2f2f] rounded">Cancel</button>
          <button onClick={()=>window.location.hash='#/me'} className="px-8 py-2 bg-white text-black rounded font-bold">Save</button>
        </div>
      </div>
    </div>
  )
}