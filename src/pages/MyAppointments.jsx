import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } });
      if (data.success) setAppointments(data.appointments.reverse());
    } catch (error) { toast.error(error.message); }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment", { appointmentId }, { headers: { token } });
      if (data.success) { toast.success("Appointment Cancelled!"); getUserAppointments(); getDoctorsData(); }
      else toast.error(data.message);
    } catch (error) { toast.error(error.message); }
  };

  const handlePayOnline = (item) => {
    setSelectedAppointment(item);
    setPaymentDone(false);
    setShowPayModal(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      await axios.post(backendUrl + "/api/user/payment-success", { appointmentId: selectedAppointment._id }, { headers: { token } });
    } catch (error) { console.log(error); }
    setPaymentDone(true);
    toast.success("Payment Successful! 🎉");
    setTimeout(() => { setShowPayModal(false); getUserAppointments(); }, 2000);
  };

  const getStatusBadge = (item) => {
    if (item.cancelled) {
      return (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
          <span className="text-2xl">❌</span>
          <div>
            <p className="text-red-500 font-semibold text-sm">Appointment Cancelled</p>
            <p className="text-red-400 text-xs">This appointment has been cancelled</p>
          </div>
        </div>
      );
    }
    if (item.isCompleted) {
      return (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="text-green-600 font-semibold text-sm">Appointment Completed</p>
            <p className="text-green-500 text-xs">Your appointment is completed</p>
          </div>
        </div>
      );
    }
    if (item.isConfirmed) {
      return (
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-blue-600 font-semibold text-sm">Appointment Confirmed!</p>
            <p className="text-blue-500 text-xs">{slotDateFormat(item.slotDate)} at {item.slotTime}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
        <span className="text-2xl">⏳</span>
        <div>
          <p className="text-yellow-600 font-semibold text-sm">Pending Confirmation</p>
          <p className="text-yellow-500 text-xs">Waiting for admin to confirm</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="px-4 sm:px-0">

      {/* Payment Modal */}
      {showPayModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            {!paymentDone ? (
              <>
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Pay Online</h2>
                  <p className="text-gray-500 text-sm mt-1">Scan QR to pay appointment fees</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-center gap-3">
                  <img className="w-12 h-12 rounded-full object-cover" src={selectedAppointment.docData.image} alt="" />
                  <div>
                    <p className="font-medium text-gray-800">{selectedAppointment.docData.name}</p>
                    <p className="text-sm text-gray-500">{selectedAppointment.docData.speciality}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-gray-500">Fees</p>
                    <p className="text-lg font-bold text-primary">₹{selectedAppointment.amount}</p>
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="border-4 border-primary rounded-2xl p-2">
                    <img
                      src="https://res.cloudinary.com/ddslcdypq/image/upload/v1/scanner"
                      alt="PhonePe QR"
                      className="w-52 h-52 object-contain"
                    />
                  </div>
                </div>
                <p className="text-center text-xs text-gray-500 mb-4">Scan with PhonePe, GPay, Paytm or any UPI app</p>
                <div className="flex gap-3">
                  <button onClick={handlePaymentSuccess} className="flex-1 bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90">✅ Payment Done</button>
                  <button onClick={() => setShowPayModal(false)} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-green-500 mb-2">Payment Successful!</h2>
                <p className="text-gray-500 text-sm mb-2">Your appointment is confirmed</p>
                <p className="text-gray-700 font-medium">{selectedAppointment.docData.name}</p>
                <p className="text-primary font-bold text-xl mt-1">₹{selectedAppointment.amount} Paid</p>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b text-lg">My Appointments</p>

      {appointments.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 text-gray-500">
          <p className="text-5xl">📅</p>
          <p className="text-lg">No appointments found</p>
          <a href="/doctors" className="text-primary underline">Book an appointment</a>
        </div>
      ) : (
        <div>
          {appointments.map((item, index) => (
            <div className="bg-white border rounded-2xl p-4 sm:p-6 mb-4 shadow-sm hover:shadow-md transition-all" key={index}>
              <div className="flex flex-col sm:flex-row gap-4">

                {/* Doctor Image */}
                <img className="w-28 sm:w-36 h-28 sm:h-36 bg-indigo-50 rounded-xl object-cover" src={item.docData.image} alt="" />

                {/* Doctor Info */}
                <div className="flex-1">
                  <p className="text-neutral-800 font-bold text-lg">{item.docData.name}</p>
                  <p className="text-primary text-sm font-medium">{item.docData.speciality}</p>
                  <div className="mt-2 text-sm text-gray-500 space-y-1">
                    <p>📍 {item.docData.address.line1}, {item.docData.address.line2}</p>
                    <p>📅 <span className="font-medium text-gray-700">{slotDateFormat(item.slotDate)}</span> at <span className="font-medium text-gray-700">{item.slotTime}</span></p>
                    <p>💰 Fees: <span className="font-semibold text-primary">₹{item.amount}</span>
                      {item.payment && <span className="ml-2 text-green-500 text-xs">✅ Paid</span>}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 sm:w-44">
                  {!item.cancelled && !item.isCompleted && (
                    <>
                      {!item.payment ? (
                        <button onClick={() => handlePayOnline(item)} className="w-full py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">
                          💳 Pay Online
                        </button>
                      ) : (
                        <button className="w-full py-2 bg-green-50 text-green-500 border border-green-300 rounded-xl text-sm cursor-default">
                          ✅ Paid
                        </button>
                      )}
                      <button onClick={() => cancelAppointment(item._id)} className="w-full py-2 border border-red-200 text-red-400 rounded-xl text-sm hover:bg-red-500 hover:text-white transition-all">
                        ✕ Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4">
                {getStatusBadge(item)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;