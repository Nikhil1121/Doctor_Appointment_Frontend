import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
    <div className='md:mx-50'>
        <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                {/* -----left section----- */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vitae, sunt eligendi magni eum ratione, esse temporibus vero sequi at, doloremque
                    deleniti nihil corrupti quia inventore illum? Officiis, a reiciendis!</p>
                </div>

                 {/* -----center section----- */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li> Contact</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                 {/* -----right section----- */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91-446-664-7863</li>
                        <li>nikhilshendre@gmail.com</li>
                    </ul>
                </div>
        </div>

            {/* -------- Copyright text--------- */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ Prescripto - All Right Reserved</p>
        </div>
    </div>
    )
}

export default Footer