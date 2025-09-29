'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ComposePage() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      router.push('/login');
    } else {
      setToken(storedToken);
    }

    // ✅ Load draft email + subject from GenerateEmail
    const draftBody = localStorage.getItem('draftEmail');
    const draftSubject = localStorage.getItem('draftSubject');
    if (draftBody || draftSubject) {
      setFormData(prev => ({
        ...prev,
        subject: draftSubject || prev.subject,
        body: draftBody || prev.body
      }));
      localStorage.removeItem('draftEmail');
      localStorage.removeItem('draftSubject');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.to || !formData.subject || !formData.body) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.to)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSending(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/email/send`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      if (response.data.success) {
        toast.success('Email sent successfully!');
        setStatus({
          type: 'success',
          message: `Email sent successfully! Message ID: ${response.data.messageId}`
        });

        setFormData({
          to: '',
          subject: '',
          body: ''
        });
      }
    } catch (error) {
      console.error('Email sending error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send email';
      toast.error(errorMessage);
      setStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Toaster position="top-center" />
      
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Compose Email
            </motion.h1>

            {status.message && (
              <motion.div 
                className={`p-4 mb-6 rounded-lg ${status.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {status.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="to" className="block text-slate-700 dark:text-slate-200 font-semibold mb-2">
                  To:
                </label>
                <input
                  type="email"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="recipient@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="subject" className="block text-slate-700 dark:text-slate-200 font-semibold mb-2">
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Email subject"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="body" className="block text-slate-700 dark:text-slate-200 font-semibold mb-2">
                  Message:
                </label>
                <textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  rows="12"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  placeholder="Write your email content here..."
                ></textarea>
              </motion.div>

              <motion.div 
                className="flex justify-end space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ to: '', subject: '', body: '' });
                    toast.success('Form cleared');
                  }}
                  className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  Clear
                </button>
                
                <button
                  type="submit"
                  disabled={
                    isSending ||
                    !formData.to.trim() ||
                    !formData.subject.trim() ||
                    !formData.body.trim()
                  }
                  className={`px-8 py-3 rounded-lg text-white font-semibold transition ${
                    isSending
                      ? 'bg-blue-400 cursor-not-allowed'
                      : (!formData.to.trim() || !formData.subject.trim() || !formData.body.trim())
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 shadow-lg'
                  }`}
                >
                  {isSending ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Email'
                  )}
                </button>
              </motion.div>
            </form>

            {/* Email Preview */}
            {(formData.to || formData.subject || formData.body) && (
              <motion.div
                className="mt-8 p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Email Preview</h3>
                <div className="space-y-2 text-sm">
                  {formData.to && (
                    <p><span className="font-medium">To:</span> {formData.to}</p>
                  )}
                  {formData.subject && (
                    <p><span className="font-medium">Subject:</span> {formData.subject}</p>
                  )}
                  {formData.body && (
                    <div>
                      <p className="font-medium mb-2">Message:</p>
                      <div className="bg-white dark:bg-slate-800 p-4 rounded border max-h-40 overflow-y-auto">
                        {formData.body.split('\n').map((line, index) => (
                          <p key={index} className="mb-1">{line}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}