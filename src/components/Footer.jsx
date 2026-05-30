import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()

    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        Prescripto is your trusted partner in managing healthcare needs conveniently and efficiently. We bridge the gap between patients and healthcare providers.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-3 text-gray-600'>
                        <li onClick={() => { navigate('/'); scrollTo(0, 0) }} className='cursor-pointer hover:text-primary transition-colors duration-200'>Home</li>
                        <li onClick={() => { navigate('/about'); scrollTo(0, 0) }} className='cursor-pointer hover:text-primary transition-colors duration-200'>About us</li>
                        <li onClick={() => { navigate('/contact'); scrollTo(0, 0) }} className='cursor-pointer hover:text-primary transition-colors duration-200'>Contact</li>
                        <li onClick={() => { navigate('/privacy-policy'); scrollTo(0, 0) }} className='cursor-pointer hover:text-primary transition-colors duration-200'>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-3 text-gray-600'>
                        <li onClick={() => window.open('tel:+916263058281')} className='cursor-pointer hover:text-primary transition-colors duration-200 flex items-center gap-2'>📞 +91-62630-58281</li>
                        <li onClick={() => window.open('mailto:nikhilshendre@gmail.com')} className='cursor-pointer hover:text-primary transition-colors duration-200 flex items-center gap-2'>📧 nikhilshendre@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center text-gray-500'>Copyright 2025 © Prescripto — All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer