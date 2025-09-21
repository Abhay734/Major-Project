'use client';

// import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import Header from '@/components/Header';
import axios from 'axios';
// import EmailGeneratorSimple from '@/components/email-generator-simple';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Import Tabs components

export default function ComposePage() {
  // console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  // const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    }
  }, [router]);


  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSimpleMode, setIsSimpleMode] = useState(true); // State to toggle between modes

  const handleTabChange = (value) => {
    setIsSimpleMode(value === 'simple');
  };

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, loading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.to || !formData.subject || !formData.body) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: '', message: '' });

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/email/send`,
        formData,
        {
          // withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setStatus({
          type: 'success',
          message: 'Email sent successfully!'
        });

        // Reset form
        setFormData({
          to: '',
          subject: '',
          body: ''
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send email'
      });
    } finally {
      setIsSending(false);
    }
  };

  // if (loading || !user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* <Header /> */}
      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Generator Section */}
          <div className="bg-slate-900 rounded-lg shadow p-6 border border-slate-800">
            {/* <Tabs
              value={isSimpleMode ? 'simple' : 'advanced'}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="mb-4 bg-slate-800 border border-slate-700 rounded-lg">
                <TabsTrigger value="simple" className="data-[state=active]:bg-sky-700 data-[state=active]:text-white text-slate-300">Simple Email Generator</TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-sky-700 data-[state=active]:text-white text-slate-300">Advanced Email Generator</TabsTrigger>
              </TabsList>

              <TabsContent value="simple">
                <EmailGeneratorSimple
                  onAddToMessage={html =>
                    setFormData(prev => ({ ...prev, body: html }))
                  }
                />
              </TabsContent>
              <TabsContent value="advanced">
                <EmailGenerator
                  onAddToMessage={html =>
                    setFormData(prev => ({ ...prev, body: html }))
                  }
                />
              </TabsContent>
            </Tabs> */}
          </div>

          {/* Compose Email Section */}
          <div className="bg-slate-900 rounded-lg shadow p-6 border border-slate-800">
            <h1 className="text-2xl font-bold mb-6 text-slate-100">Compose Email</h1>

            {status.message && (
              <div className={`p-4 mb-6 rounded ${status.type === 'success'
                ? 'bg-green-900 text-green-300 border border-green-700'
                : 'bg-red-900 text-red-300 border border-red-700'
                }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="to" className="block text-slate-200 font-medium mb-2">
                  To:
                </label>
                <input
                  type="email"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-700 rounded-md bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="recipient@example.com"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-slate-200 font-medium mb-2">
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-700 rounded-md bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Email subject"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="body" className=" text-black font-medium mb-2">
                  Message:
                </label>
                <textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  rows="10"
                  className="w-full px-4 py-2 border border-slate-700 rounded-md bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm"
                  placeholder="Your email content will appear here..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={
                    isSending ||
                    !formData.to.trim() ||
                    !formData.subject.trim() ||
                    !formData.body.trim()
                  }
                  className={`px-6 py-2 rounded-md text-white font-medium ${
                    isSending
                      ? 'bg-sky-400'
                      : (!formData.to.trim() || !formData.subject.trim() || !formData.body.trim())
                      ? 'bg-slate-700 cursor-not-allowed'
                      : 'bg-sky-600 hover:bg-sky-700'
                  } transition`}
                >
                  {isSending ? 'Sending...' : 'Send Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}