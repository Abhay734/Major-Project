'use client';
import UseAppContext from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const Layout = ({ children }) => {

    const { loggedIn, loading } = UseAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !loggedIn) {
            toast.error("Please login to access this page");
            router.push('/login');
        }
    }, [loggedIn, loading, router]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div>{children}</div>
    )
}

export default Layout;