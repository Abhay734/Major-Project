'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import UseAppContext from '@/context/AppContext';

const GenerateEmail = () => {
  const [result, setResult] = useState('');
  const { authToken, loading: contextLoading } = UseAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const saveEmail = async () => {
    if (!authToken) {
      toast.error('You must be logged in to save an email.');
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/template/add`, {
        content: result,
        prompt: formik.values.scenario,
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      toast.success('Email saved as template!');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Failed to save email as template.');
    }
  };

  const formik = useFormik({
    initialValues: {
      scenario: '',
      purpose: '',
      subject: '',
      tone: 'professional',
    },
    validationSchema: Yup.object({
      scenario: Yup.string().required('Scenario is required'),
    }),
    onSubmit: async (values) => {
      setResult('');
      setIsGenerating(true);
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/generator/generate`, {
          scenario: values.scenario,
          purpose: values.purpose,
          subject: values.subject,
          tone: values.tone,
        }, {
          headers: authToken ? { 'Authorization': `Bearer ${authToken}` } : {}
        });

        let emailHtml = '';
        if (res.data.email) {
          const htmlMatch = res.data.email.match(/<html[^>]*>([\s\S]*?)<\/html>/i);
          if (htmlMatch) {
            emailHtml = htmlMatch[1];
          } else {
            const htmlTags = res.data.email.match(/<[^>]+>[\s\S]*?<\/[^>]+>/g);
            emailHtml = htmlTags ? htmlTags.join('') : res.data.email;
          }
          setResult(emailHtml);
          toast.success('Email generated!');
        } else {
          toast.error('Failed to generate email.');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'AI service unavailable');
      } finally {
        setIsGenerating(false);
      }
    },
  });

  // Show loading state until component is mounted and context is ready
  if (!isMounted || contextLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Toaster position="top-center" />

      <motion.div
        className="w-full md:w-2/3 lg:w-1/2 p-8 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-neutral-700"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          AI Email Generator
        </motion.h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="scenario" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Scenario
            </label>
            <textarea
              id="scenario"
              name="scenario"
              rows={4}
              value={formik.values.scenario}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white transition"
              placeholder="Describe the email you want to generate..."
              required
            />
            {formik.touched.scenario && formik.errors.scenario ? (
              <div className="text-xs text-red-600 mt-2">{formik.errors.scenario}</div>
            ) : null}
          </div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: showAdvanced ? 'auto' : 0, opacity: showAdvanced ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 space-y-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Advanced Options</h4>
              <div>
                <label htmlFor="purpose" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Purpose
                </label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  value={formik.values.purpose}
                  onChange={formik.handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  placeholder="e.g., Follow-up, cold outreach, marketing"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  placeholder="Enter a specific subject line"
                />
              </div>
              <div>
                <label htmlFor="tone" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tone
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formik.values.tone}
                  onChange={formik.handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="formal">Formal</option>
                  <option value="persuasive">Persuasive</option>
                </select>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-between items-center space-x-4">
            <motion.button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center"
              disabled={isGenerating}
              whileHover={{ scale: isGenerating ? 1 : 1.05 }}
              whileTap={{ scale: isGenerating ? 1 : 0.95 }}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : 'Generate Email'}
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="py-3 px-4 bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold shadow-lg hover:bg-gray-300 dark:hover:bg-neutral-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAdvanced ? 'Hide Advanced' : 'Advanced Options'}
            </motion.button>
          </div>
        </form>

        {result && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-full p-6 bg-gray-50 dark:bg-neutral-800 rounded-2xl shadow-inner border border-gray-200 dark:border-neutral-700">
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
                Generated Email Preview
              </h3>

              <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-md">
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-gray-200"
                  dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br/>') }}
                />
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <motion.button
                  onClick={saveEmail}
                  className="py-2 px-6 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-md transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save as Template
                </motion.button>

                <motion.button
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    toast.success('Email copied to clipboard!');
                  }}
                  className="py-2 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Copy to Clipboard
                </motion.button>

                <motion.button
                  onClick={() => {
                    // Store in memory instead of localStorage to avoid hydration issues
                    const draftData = { email: result, subject: formik.values.subject };
                    sessionStorage.setItem('draftEmail', JSON.stringify(draftData));
                    router.push('/user/compose');
                  }}
                  className="py-2 px-6 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 shadow-md transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Compose & Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="w-full max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-center">
          <img
            src="https://media.coschedule.com/uploads/2024/02/Generator-Meta-Feautured-Img_AI-Email-.png"
            alt="Email Illustration"
            className="rounded-2xl shadow-xl w-full max-w-md"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Why MailSmith?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            MailSmith helps you craft professional emails powered by AI. From outreach
            to marketing campaigns, save time and improve results with smartly generated
            templates that adapt to your needs. Our intuitive interface and automation
            features ensure your emails always make an impact.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GenerateEmail;