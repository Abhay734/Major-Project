'use client'
import React from 'react'
import TextType from '@/components/TextType'
import { motion } from 'framer-motion'

const features = [
	{
		title: 'Personalized Mass Emails',
		description:
			'Send highly personalized emails to thousands of recipients with just a few clicks.',
		icon: '📧',
	},
	{
		title: 'Real-Time Tracking',
		description:
			'Monitor open rates, clicks, and replies instantly to optimize your outreach.',
		icon: '📊',
	},
	{
		title: 'Easy Follow-Ups',
		description:
			'Automate follow-up emails to boost your response rate and engagement.',
		icon: '🔁',
	},
	{
		title: 'Works with Gmail & Outlook',
		description:
			'Seamlessly integrate with your favorite email provider for maximum convenience.',
		icon: '💼',
	},
]

const Footer = () => (
  <footer className="bg-gray-100 text-gray-600 text-sm py-8">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Company Info */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg text-blue-600">MailSmith</p>
          <p className="text-gray-500">Powered by MailSmith • 123-456-7890 • info@mailsmith.com</p>
        </div>

        {/* Legal Links */}
        <div className="space-x-6">
          <a href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</a>
          <a href="/unsubscribe" className="hover:text-blue-600 transition">Unsubscribe</a>
          <a href="/terms" className="hover:text-blue-600 transition">Terms</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="https://twitter.com/yourbrand" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <img src="/icons/twitter.svg" alt="Twitter" className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com/yourbrand" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
          </a>
          <a href="https://github.com/yourbrand" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <img src="/icons/github.svg" alt="GitHub" className="h-6 w-6" />
          </a>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} MailSmith — All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const Home = () => {
	return (
		<div className='bg-gradient-to-b from-blue-500 to-purple-600 min-h-screen flex flex-col'>
			{/* Hero Section */}
			<motion.div 
				className='flex flex-col items-center justify-center py-24 relative overflow-hidden'
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
				<TextType
					text={['Welcome to MailSmith']}
					as='h1'
					className='relative text-6xl md:text-7xl font-extrabold text-white text-center mb-6 drop-shadow-2xl'
					typingSpeed={75}
					pauseDuration={1000}
					showCursor={true}
					cursorCharacter='|'
				/>
				<motion.p 
					className='relative text-2xl text-white text-center max-w-2xl mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 1 }}
				>
					The easiest way to send personalized emails at scale. Trusted by
					millions worldwide.
				</motion.p>
				<motion.a
					href='/user/generate-email'
					className='relative bg-white text-blue-600 font-semibold px-10 py-4 rounded-full shadow-xl hover:bg-blue-100 transition transform'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					Get Started
				</motion.a>
			</motion.div>

			{/* Features Section */}
			<div className='bg-white rounded-t-3xl py-20 px-6 md:px-20 shadow-2xl flex-grow relative z-10'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
					<motion.div 
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className='text-5xl font-extrabold mb-8 text-blue-700'>
							Send personalized emails at scale
						</h2>
						<p className='text-lg text-gray-700 mb-10 leading-relaxed'>
							With over 6 million users worldwide, MailSmith is an easy-to-use
							email outreach solution to send personalized mass emails with Gmail
							or Outlook. Track your results in real time and follow up easily to
							get more replies.
						</p>
						<ul className='space-y-8'>
							{features.map((feature, idx) => (
								<motion.li 
									key={idx} 
									className='flex items-start bg-blue-50 p-4 rounded-xl shadow-sm hover:shadow-md transition'
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: idx * 0.2, duration: 0.6 }}
									viewport={{ once: true }}
								>
									<span className='text-4xl mr-5'>{feature.icon}</span>
									<div>
										<div className='font-bold text-blue-700 text-lg'>
											{feature.title}
										</div>
										<div className='text-gray-600'>
											{feature.description}
										</div>
									</div>
								</motion.li>
							))}
						</ul>
					</motion.div>
					<motion.div 
						className='flex justify-center'
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1 }}
						viewport={{ once: true }}
					>
						<img
							src='https://media.coschedule.com/uploads/2024/02/Generator-Meta-Feautured-Img_AI-Email-.png'
							alt='AI Enhanced Emails'
							className='rounded-3xl shadow-2xl w-full max-w-lg hover:scale-105 transition-transform'
						/>
					</motion.div>
				</div>
			</div>

			{/* <Footer /> */}
		</div>
	)
}

export default Home
