'use client';
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setLoggedIn(true);
    }
    setLoading(false);
  }, []);


  const logout = () => {
    localStorage.removeItem('authToken');
    setLoggedIn(false);
    router.replace('/login');
  }

  return <AppContext.Provider value={{ loggedIn, setLoggedIn, logout, loading }} >
    {children}
  </AppContext.Provider>

}

const UseAppContext = () => useContext(AppContext);

export default UseAppContext;