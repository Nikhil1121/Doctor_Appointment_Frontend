import RelatedDoctors from "../components/RelatedDoctors";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData, userData, loadUserProfileData } = useContext(AppContext);
  const navigate = useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Profile modal state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    phone: "",
    dob: "",
    gender: "Male",
  });

  const isProfileComplete = () => {
    if (!userData) return false;
    return (
      userData.phone && userData.phone !== "0000000000" &&
      userData.dob && userData.dob !== "Not Selected" &&
      userData.gender && userData.gender !== "Not Selected"
    );
  };

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;

        const isSlotAvailable = docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({ dateTime: new Date(currentDate), time: formattedTime });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const saveProfileAndBook = async () => {
    if (!profileData.phone || !profileData.dob || !profileData.gender) {
      return toast.error("Please fill all details!");
    }

    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", profileData.phone);
      formData.append("dob", profileData.dob);
      formData.append("gender", profileData.gender);
      formData.append("address", JSON.stringify(userData.address || { line1: "", line2: "" }));

      const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, {
        headers: { token },
      });

      if (data.success) {
        await loadUserProfileData();
        setShowProfileModal(false);
        toast.success("Profile saved! Booking appointment...");
        setTimeout(() => bookAppointment(true), 500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const bookAppointment = async (skipCheck = false) => {
    if (!token) {
      toast.warn("Please login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      return toast.warn("Please select a time slot");
    }

    // Profile check
    if (!skipCheck && !isProfileComplete()) {
      setShowProfileModal(true);
      return;
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment Booked Successfully! 🎉");
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* Profile Complete Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Complete Your Profile</h2>
              <p className="text-gray-500 text-sm mb-5">Please fill your details before booking appointment</p>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Phone Number</p>
                  <input
                    className="border border-gray-300 rounded-lg w-full p-2.5 focus:outline-primary text-sm"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Date of Birth</p>
                  <input
                    className="border border-gray-300 rounded-lg w-full p-2.5 focus:outline-primary text-sm"
                    type="date"
                    value={profileData.dob}
                    onChange={(e) => setProfileData(prev => ({ ...prev, dob: e.target.value }))}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Gender</p>
                  <select
                    className="border border-gray-300 rounded-lg w-full p-2.5 focus:outline-primary text-sm"
                    value={profileData.gender}
                    onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={saveProfileAndBook}
                    className="flex-1 bg-primary text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Save & Book Appointment
                  </button>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-auto">
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt={docInfo.name} />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-6 py-7 bg-white mx-2 sm:mx-0">
            <p className="flex items-center gap-2 text-xl sm:text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700">
          <p className="text-lg mb-3">Booking Slots</p>

          <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
            {docSlots.length > 0 && docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-4 min-w-[60px] rounded-full cursor-pointer transition-all ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200 hover:bg-gray-50"}`}
                key={index}
              >
                <p className="text-xs">{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p className="text-sm font-medium">{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2">
            {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all ${item.time === slotTime ? "bg-primary text-white" : "text-gray-400 border border-gray-300 hover:bg-gray-50"}`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          {docSlots.length > 0 && docSlots[slotIndex].length === 0 && (
            <p className="text-gray-500 mt-4">No slots available for this day</p>
          )}

          <button
            onClick={() => bookAppointment(false)}
            className="bg-primary text-white text-sm font-light px-10 sm:px-14 py-3 rounded-full my-6 hover:opacity-90 transition-opacity active:scale-95"
          >
            Book an Appointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;