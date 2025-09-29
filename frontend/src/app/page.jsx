'use client'
import React from 'react'
import TextType from '@/components/TextType'
import { motion } from 'framer-motion'

const features = [
	{
		title: 'Personalized Mass Emails',
		description:
			'Craft and send unique, personalized emails to thousands of recipients without a single line of code. Our powerful merge tags ensure every email feels one-of-a-kind.',
		icon: '📧',
	},
	{
		title: 'Real-Time Tracking',
		description:
			'Gain instant insights into your campaign performance. Track open rates, clicks, and replies in real time to optimize your outreach strategy instantly.',
		icon: '📊',
	},
	{
		title: 'Automated Follow-Ups',
		description:
			'Never miss a chance to connect. Schedule and automate follow-up emails based on recipient behavior, dramatically boosting your response and conversion rates.',
		icon: '🔁',
	},
	{
		title: 'Seamless Integrations',
		description:
			'MailSmith integrates effortlessly with your existing workflow. Works flawlessly with both Gmail and Outlook, so you can start sending in minutes, not hours.',
		icon: '💼',
	},
	{
		title: 'AI-Powered Assistant',
		description:
			'Let our AI write the perfect email for you. Generate compelling subject lines, write entire email bodies, and optimize your content for maximum engagement.',
		icon: '🤖',
	},
	{
		title: 'Built-in A/B Testing',
		description:
			'Remove the guesswork from your campaigns. Test different subject lines and email content to find what resonates best with your audience.',
		icon: '🔬',
	},
]

const testimonials = [
	{
		quote:
			'MailSmith transformed our cold outreach. We went from a 3% response rate to over 20% in just one month. The real-time tracking is a game-changer!',
		name: 'Jane Doe',
		company: 'Founder, Innovate Co.',
	},
	{
		quote:
			"The automated follow-ups are a lifesaver. I'm able to keep my pipeline full without spending hours on manual tasks. It's truly a set-it-and-forget-it solution.",
		name: 'John Smith',
		company: 'Sales Director, GrowthCorp',
	},
	{
		quote:
			'Finally, a tool that works perfectly with Outlook! The personalized emails look so professional, and our clients love the quick, relevant replies.',
		name: 'Sarah Lee',
		company: 'Marketing Manager, Bright Solutions',
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
		<div className='bg-gray-50 min-h-screen flex flex-col font-sans'>
			{/* Hero Section */}
			<motion.div
				className='bg-blue-600 text-white flex flex-col items-center justify-center py-24 md:py-32 relative overflow-hidden'
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
				<div className='container mx-auto px-6 text-center relative z-10'>
					<TextType
						text={['The modern email outreach platform.']}
						as='h1'
						className='text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl'
						typingSpeed={75}
						pauseDuration={1000}
						showCursor={true}
						cursorCharacter='|'
					/>
					<motion.p
						className='text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.8 }}
					>
						Send personalized emails at scale, track your results in real-time,
						and automate follow-ups to get more replies.
					</motion.p>
					<motion.a
						href='/user/generate-email'
						className='bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-blue-50 transition transform'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Get Started for Free
					</motion.a>
				</div>
			</motion.div>

			{/* Features Section */}
			<div className='bg-white py-20 px-6 md:px-20 shadow-inner flex-grow relative z-10'>
				<div className='container mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-blue-700 leading-tight'>
								The all-in-one solution for your outreach.
							</h2>
							<p className='text-lg text-gray-700 mb-10 leading-relaxed'>
								MailSmith is a complete platform designed to help you connect
								with your audience, build relationships, and grow your business,
								all without the hassle of manual emailing.
							</p>
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
					<div className='mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
						{features.map((feature, idx) => (
							<motion.div
								key={idx}
								className='bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow'
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: idx * 0.1, duration: 0.6 }}
								viewport={{ once: true }}
							>
								<div className='text-5xl mb-4'>{feature.icon}</div>
								<h3 className='font-bold text-xl text-blue-700 mb-2'>
									{feature.title}
								</h3>
								<p className='text-gray-600'>{feature.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* How it Works Section */}
			<div className='bg-white py-20 px-6 md:px-20'>
				<div className='container mx-auto text-center'>
					<h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-blue-700'>
						Simple Steps, Incredible Results
					</h2>
					<p className='text-lg text-gray-600 mb-12 max-w-3xl mx-auto'>
						Getting started with MailSmith is easy. Follow these simple steps to launch your first campaign in minutes.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
						<motion.div
							className='relative flex flex-col items-center text-center p-6'
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
								<span className='text-3xl font-bold text-blue-600'>1</span>
							</div>
							<h3 className='text-2xl font-semibold text-blue-700 mb-2'>Connect Your Account</h3>
							<p className='text-gray-600'>Securely link your Gmail or Outlook account. We handle the rest, so you can focus on your outreach.</p>
						</motion.div>
						<motion.div
							className='relative flex flex-col items-center text-center p-6'
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
								<span className='text-3xl font-bold text-blue-600'>2</span>
							</div>
							<h3 className='text-2xl font-semibold text-blue-700 mb-2'>Create Your Campaign</h3>
							<p className='text-gray-600'>Upload your list, write your email, and add personalization tags. Our intuitive editor makes it simple.</p>
						</motion.div>
						<motion.div
							className='relative flex flex-col items-center text-center p-6'
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
								<span className='text-3xl font-bold text-blue-600'>3</span>
							</div>
							<h3 className='text-2xl font-semibold text-blue-700 mb-2'>Send and Track</h3>
							<p className='text-gray-600'>Hit send and watch your results roll in. Monitor opens, clicks, and replies from your dashboard.</p>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Testimonials Section */}
			<div className='bg-gray-100 py-20 px-6 md:px-20'>
				<div className='container mx-auto text-center'>
					<h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-blue-700'>
						Trusted by Professionals
					</h2>
					<p className='text-lg text-gray-600 mb-12 max-w-3xl mx-auto'>
						Don't just take our word for it. Hear what our satisfied users have to say about MailSmith.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{testimonials.map((testimonial, idx) => (
							<motion.div
								key={idx}
								className='bg-white p-8 rounded-2xl shadow-xl border border-gray-200'
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ delay: idx * 0.1, duration: 0.6 }}
								viewport={{ once: true }}
							>
								<p className='text-gray-700 italic text-lg mb-4 leading-relaxed'>
									"{testimonial.quote}"
								</p>
								<div className='text-right'>
									<div className='font-bold text-blue-600'>{testimonial.name}</div>
									<div className='text-sm text-gray-500'>{testimonial.company}</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Final Call to Action Section */}
			<div className='bg-blue-600 py-20 px-6 md:px-20 text-white text-center'>
				<div className='container mx-auto'>
					<motion.h2
						className='text-4xl md:text-5xl font-extrabold mb-4'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						Ready to transform your outreach?
					</motion.h2>
					<motion.p
						className='text-xl font-light max-w-2xl mx-auto mb-8'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.8 }}
						viewport={{ once: true }}
					>
						Join millions of users who trust MailSmith to send personalized,
						effective emails at scale.
					</motion.p>
					<motion.a
						href='/user/generate-email'
						className='bg-white text-blue-600 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-blue-50 transition transform'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Start Your Free Campaign
					</motion.a>
				</div>
			</div>

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	)
}

export default Home