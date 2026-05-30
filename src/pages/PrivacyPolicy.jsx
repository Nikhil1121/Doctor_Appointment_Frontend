import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold text-gray-800 mb-2'>Privacy Policy</h1>
      <p className='text-gray-500 text-sm mb-8'>Last updated: January 2025</p>

      <div className='space-y-8 text-gray-600 leading-7'>

        <section>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, book an appointment, or contact us for support. This includes your name, email address, phone number, date of birth, and health-related information necessary for booking appointments.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, process appointment bookings, send you confirmations and reminders, and communicate with you about our services.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>3. Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with healthcare providers you choose to book appointments with, and with service providers who assist us in operating our platform.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted and stored securely.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>5. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time through your account settings. You may also contact us directly to exercise these rights.</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <div className='mt-3 bg-gray-50 rounded-xl p-4'>
            <p>📧 <a href='mailto:nikhilshendre@gmail.com' className='text-primary hover:underline'>nikhilshendre@gmail.com</a></p>
            <p className='mt-1'>📞 <a href='tel:+916263058281' className='text-primary hover:underline'>+91-62630-58281</a></p>
          </div>
        </section>

      </div>
    </div>
  )
}

export default PrivacyPolicy