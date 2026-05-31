import React from 'react'

const cardsData = [
  { image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200', name: 'Rahul Sharma', handle: '@rahulsharma', date: 'April 20, 2025', text: 'Prescripto made booking my doctor appointment so easy! Got confirmed within minutes. Highly recommended!' },
  { image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200', name: 'Priya Verma', handle: '@priyaverma', date: 'May 10, 2025', text: 'Amazing platform! The doctors are very professional and the booking process is seamless.' },
  { image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60', name: 'Amit Singh', handle: '@amitsingh', date: 'June 5, 2025', text: 'Best healthcare app I have used. Found a specialist doctor in my area within seconds!' },
  { image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60', name: 'Neha Patel', handle: '@nehapatel', date: 'March 15, 2025', text: 'The appointment confirmation feature is brilliant. I always know the status of my booking!' },
  { image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=60', name: 'Sneha Joshi', handle: '@snehajoshi', date: 'July 1, 2025', text: 'Very user friendly interface. Booked my appointment in less than 2 minutes. Great experience!' },
  { image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60', name: 'Vikram Mehta', handle: '@vikrammehta', date: 'August 12, 2025', text: 'Prescripto is a game changer! No more waiting in long queues. Book online and visit on time.' },
  { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60', name: 'Anita Rao', handle: '@anitarao', date: 'September 3, 2025', text: 'I love how I can see doctor profiles and book instantly. This app saved me so much time!' },
  { image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60', name: 'Rohan Gupta', handle: '@rohangupta', date: 'October 8, 2025', text: 'Excellent service! The doctor was very helpful and the online payment was super convenient.' },
]

const CreateCard = ({ card }) => (
  <div className="p-3 sm:p-5 rounded-2xl mx-2 sm:mx-3 shadow-md hover:shadow-xl transition-all duration-300 w-52 sm:w-72 shrink-0 bg-white border border-gray-100">
    <div className="flex gap-2 sm:gap-3">
      <img className="w-8 h-8 sm:w-11 sm:h-11 rounded-full object-cover" src={card.image} alt={card.name} />
      <div className="flex flex-col justify-center">
        <p className="font-semibold text-gray-800 text-xs sm:text-sm">{card.name}</p>
        <span className="text-xs text-slate-400">{card.handle}</span>
      </div>
    </div>
    <div className="flex gap-0.5 mt-2 sm:mt-3">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-xs sm:text-sm py-2 sm:py-3 text-gray-600 leading-relaxed line-clamp-3">{card.text}</p>
    <div className="flex items-center justify-between text-slate-400 text-xs border-t border-gray-100 pt-2 sm:pt-3">
      <span className="text-xs">✓ Verified</span>
      <p className="text-xs">{card.date}</p>
    </div>
  </div>
)

const Testimonial = () => {
  return (
    <div className='py-10 sm:py-16'>
      <div className='text-center mb-6 sm:mb-10'>
        <h2 className='text-2xl sm:text-3xl font-medium text-gray-900'>What Our Patients Say</h2>
        <p className='text-gray-500 mt-2 text-xs sm:text-sm'>Trusted by thousands of patients across India 🇮🇳</p>
      </div>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner { animation: marqueeScroll 30s linear infinite; }
        .marquee-reverse { animation-direction: reverse; }
        .marquee-inner:hover { animation-play-state: paused; }
      `}</style>
      <div className="w-full overflow-hidden relative mb-4">
        <div className="absolute left-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner flex min-w-[200%] py-2 sm:py-3">
          {[...cardsData, ...cardsData].map((card, index) => <CreateCard key={index} card={card} />)}
        </div>
        <div className="absolute right-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
      <div className="w-full overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex min-w-[200%] py-2 sm:py-3">
          {[...cardsData, ...cardsData].map((card, index) => <CreateCard key={index} card={card} />)}
        </div>
        <div className="absolute right-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </div>
  )
}

export default Testimonial