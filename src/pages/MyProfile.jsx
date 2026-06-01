import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);
      const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); }
  };

  if (!userData) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-gray-500">Loading profile...</p>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4 text-sm py-8 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer relative group">
            <img className="w-32 h-32 rounded-full object-cover opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img className={`w-8 ${!image ? "opacity-60" : "hidden"}`} src={assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
          </label>
        ) : (
          <img className="w-32 h-32 rounded-full object-cover" src={userData.image} alt="" />
        )}
        <div className="flex-1 text-center sm:text-left">
          {isEdit ? (
            <input className="bg-gray-50 border border-gray-200 rounded px-3 py-1 text-2xl font-medium w-full max-w-xs" type="text" value={userData.name} onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} />
          ) : (
            <p className="font-medium text-3xl text-neutral-800">{userData.name}</p>
          )}
        </div>
      </div>

      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
        <p className="text-neutral-500 underline mt-3 font-medium">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_2fr] gap-y-3 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500 break-all">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input className="bg-gray-100 border rounded px-2 py-0.5 max-w-52" type="tel" value={userData.phone} onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-1">
              <input className="bg-gray-50 border rounded px-2 py-0.5" onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" placeholder="Address Line 1" />
              <input className="bg-gray-50 border rounded px-2 py-0.5" onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" placeholder="Address Line 2" />
            </div>
          ) : (
            <p className="text-gray-500">{userData.address.line1}<br />{userData.address.line2}</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3 font-medium">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_2fr] gap-y-3 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select className="max-w-32 bg-gray-100 border rounded px-2 py-0.5" onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input className="max-w-40 bg-gray-100 border rounded px-2 py-0.5" type="date" onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        {isEdit ? (
          <div className="flex gap-3">
            <button onClick={updateUserProfileData} className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all text-sm">Save Information</button>
            <button onClick={() => { setIsEdit(false); setImage(false); }} className="border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-100 transition-all text-sm text-gray-500">Cancel</button>
          </div>
        ) : (
          <button onClick={() => setIsEdit(true)} className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all text-sm">Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;