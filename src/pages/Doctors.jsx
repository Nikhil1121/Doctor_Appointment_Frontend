import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = ['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'];

  return (
    <div className="px-2 py-8">
      <h2 className="text-xl text-center font-semibold mb-6">Browse through the doctors' speciality</h2>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {specialities.map((spec) => (
          <p key={spec}
            className={`cursor-pointer px-4 py-1 rounded-full border flex-shrink-0 text-sm ${spec === speciality ? 'bg-primary text-white border-primary' : 'text-gray-600 hover:bg-gray-100 border-gray-300'}`}
            onClick={() => spec === speciality ? navigate('/doctors') : navigate(`/doctors/${spec}`)}>
            {spec}
          </p>
        ))}
      </div>

      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4'>
        {filterDoc.length > 0 ? filterDoc.map((item) => (
          <div onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 bg-white"
            key={item._id}>
            <img className="bg-blue-50 w-full h-36 sm:h-48 object-cover" src={item.image} alt={item.name} />
            <div className="p-2 sm:p-4">
              <div className="flex items-center gap-1 text-xs text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-sm sm:text-lg font-medium mt-1 leading-tight">{item.name}</p>
              <p className="text-gray-600 text-xs sm:text-sm">{item.speciality}</p>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            <p className="text-lg">No doctors found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
