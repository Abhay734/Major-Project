import React from 'react';

const Footer = () => (
    <footer className="bg-gray-100 text-gray-600 text-sm py-8">
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                {/* Company Info */}
                <div className="text-center md:text-left">
                    <p className="font-semibold text-lg text-blue-600">MailSmith</p>
                    <p className="text-gray-500">Powered by MailSmith • 738-888-7407 • abhayrajtiwari734@gmail.com</p>
                </div>

                {/* Legal Links */}
                <div className="space-x-6">
                    <a href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</a>
                    <a href="/unsubscribe" className="hover:text-blue-600 transition">Unsubscribe</a>
                    <a href="/terms" className="hover:text-blue-600 transition">Terms</a>
                </div>

                {/* Social Icons */}
                {/* <div className="flex space-x-4">
                    <a href="https://twitter.com/yourbrand" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                        <img src="/icons/twitter.svg" alt="Twitter" className="h-6 w-6" />
                    </a>
                    <a href="https://linkedin.com/yourbrand" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                        <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
                    </a>
                    <a href="https://github.com/yourbrand" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                        <img src="/icons/github.svg" alt="GitHub" className="h-6 w-6" />
                    </a>
                </div> */}


                
            </div>
            <div className="mt-6 text-center text-xs text-gray-500">
                <p>© {new Date().getFullYear()} MailSmith — All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;