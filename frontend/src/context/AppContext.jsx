'use client';
const { useRouter } = require("next/navigation");
const { createContext, useState, useContext } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const token = localStorage.getItem('authToken');
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(token ? true : false);

  const logout = () => {
    localStorage.removeItem('authToken');
    setLoggedIn(false);
    router.replace('/login');
  }

  return <AppContext.Provider value={{ loggedIn, setLoggedIn, logout }} >
    {children}
  </AppContext.Provider>

}

const UseAppContext = () => useContext(AppContext);

export default UseAppContext;