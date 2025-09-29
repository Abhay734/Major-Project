'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
// import jwtDecode from 'jwt-decode';    // ✅ fixed import
import { motion, AnimatePresence } from 'framer-motion';



const ISSERVER = typeof window === undefined;

const ManageTemplate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const prompt = searchParams.get('prompt');

  const [templateName, setTemplateName] = useState('');
  const [templatePrompt, setTemplatePrompt] = useState(prompt || '');
  const [templateContent, setTemplateContent] = useState(email || '');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) setTemplateContent(email);
    if (prompt) setTemplatePrompt(prompt);
  }, [email, prompt]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/template/getall');
      setTemplates(response.data || []);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const handleSaveTemplate = async () => {
    if (!templateName || !templateContent || !templatePrompt) {
      toast.error('Template name, prompt and content are required.');
      return;
    }

    setLoading(true);
    try {
      const token = !ISSERVER && localStorage.getItem('token');
      if (!token) {
        toast.error('You must be logged in to save a template.');
        setLoading(false);
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded._id;

      const newTemplate = {
        user: userId,
        name: templateName,
        content: templateContent,
        prompt: templatePrompt,
      };

      await axios.post('http://localhost:5000/template/add', newTemplate, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Template saved!');
      setTemplateName('');
      setTemplateContent('');
      setTemplatePrompt('');
      fetchTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateWithEmail = (content) => {
    router.push(`/manage-template?email=${encodeURIComponent(content)}`);
  };

  return (
    
      <div className="max-w-4xl mx-auto p-6">
        <Toaster position="top-center" />
        <h1 className="text-3xl font-bold mb-6">Manage Templates</h1>

        Save New Template Section
        <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Save New Template</h2>
          <input
            type="text"
            placeholder="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Template Content (HTML or Text)"
            value={templateContent}
            onChange={(e) => setTemplateContent(e.target.value)}
            className="w-full h-40 p-2 mb-4 border border-gray-300 rounded font-mono"
          ></textarea>
          <textarea
            placeholder="Template Prompt"
            value={templatePrompt}
            onChange={(e) => setTemplatePrompt(e.target.value)}
            className="w-full h-24 p-2 mb-4 border border-gray-300 rounded font-mono"
          ></textarea>
          <button
            onClick={handleSaveTemplate}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Template'}
          </button>
        </div>

        {/* Saved Templates List */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Saved Templates</h2>
          {templates.length === 0 ? (
            <p className="text-gray-600">No templates found.</p>
          ) : (
            <ul className="space-y-6">
              <AnimatePresence>
                {templates.map((template, index) => (
                  <motion.li
                    key={template._id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white border border-gray-200 p-6 rounded-xl shadow-md"
                  >
                    <h3 className="font-bold text-lg mb-3">{template.name}</h3>

                    {/* Render as card with HTML */}
                    <div className="bg-gray-50 p-4 rounded-lg border shadow-inner mb-4">
                      <div
                        className="prose max-w-none text-sm"
                        dangerouslySetInnerHTML={{ __html: template.content }}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      onClick={() => handleNavigateWithEmail(template.content)}
                    >
                      Use This Template
                    </motion.button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
  );
};

export default ManageTemplate;


// styles remain unchanged...
