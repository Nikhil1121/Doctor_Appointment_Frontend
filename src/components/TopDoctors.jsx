import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/2 text-center text-sm text-gray-500'>
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
            key={index}
          >
            <img className='bg-blue-50 w-full h-36 sm:h-48 object-cover' src={item.image} alt={item.name} />
            <div className='p-2 sm:p-4'>
              <div className='flex items-center gap-1 text-xs text-green-500'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <p>Available</p>
              </div>
              <p className='text-gray-900 text-sm sm:text-lg font-medium mt-1'>{item.name}</p>
              <p className='text-gray-600 text-xs sm:text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }}
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-primary hover:text-white transition-all'
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;