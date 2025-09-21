import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';

const GenerateEmail = () => {
  const [result, setResult] = useState('');

  const formik = useFormik({
    initialValues: {
      scenario: '',
    },
    validationSchema: Yup.object({
      scenario: Yup.string().required('Scenario is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setResult('');
      try {
        const res = await axios.post('http://localhost:5000/email/generate', { scenario: values.scenario });
        if (res.data.email) {
          setResult(res.data.email);
          toast.success('Email generated!');
        } else {
          toast.error('Failed to generate email.');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'AI service unavailable');
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md dark:bg-neutral-900 dark:text-white">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-4">AI Email Generator</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="scenario" className="block mb-2 font-medium">Scenario</label>
          <textarea
            id="scenario"
            name="scenario"
            rows={4}
            value={formik.values.scenario}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
          {formik.touched.scenario && formik.errors.scenario ? (
            <div className="text-xs text-red-600 mt-2">{formik.errors.scenario}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Generating...' : 'Generate Email'}
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg dark:bg-neutral-800">
          <h3 className="font-semibold mb-2">Generated Email:</h3>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default GenerateEmail;
