'use client';
import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Signup = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await axios.post('http://localhost:5000/user/add', values);
        if (res.status === 200) {
          toast.success('Signup successful!');
          resetForm();
          router.push('/login');
        } else {
          toast.error('Signup failed');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Network error');
      }
      setSubmitting(false);
    },
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <motion.div
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Mail Smith
          </h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign up
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?
            <a
              className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
              href="../login/page"
            >
              Sign in here
            </a>
          </p>
        </div>
        <div className="mt-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  required
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-xs text-red-600 mt-2">{formik.errors.name}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  required
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-xs text-red-600 mt-2">{formik.errors.email}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  required
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-xs text-red-600 mt-2">{formik.errors.password}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;