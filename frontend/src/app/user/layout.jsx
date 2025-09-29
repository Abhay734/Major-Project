'use client';
import UseAppContext from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const Layout = ({ children }) => {

    const { loggedIn } = UseAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!loggedIn) {
            toast.error("Please login to access this page");
            router.replace('/login');
        }
    }, [])


    return (
        <div>{children}</div>
    )
}

export default Layout;