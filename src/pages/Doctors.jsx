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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors, speciality]);

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  return (
    <div className="px-2 py-8">
      <h2 className="text-xl text-center font-semibold mb-6">Browse through the doctors' speciality</h2>

      <div className="flex flex-wrap gap-3 mb-8">
        {specialities.map((spec) => (
          <p
            key={spec}
            className={`cursor-pointer px-4 py-1 rounded-full border ${
              spec === speciality ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => navigate(`/doctors/${spec}`)}
          >
            {spec}
          </p>
        ))}
      </div>

      {/* <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5"> */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
        {filterDoc.map((item) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            key={item._id}
          >
            <img className="bg-blue-50 w-full h-48 object-cover" src={item.image} alt={item.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
