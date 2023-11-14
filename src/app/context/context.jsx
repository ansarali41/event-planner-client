'use client';

import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState({ user_id: '', email: '', isLoggedIn: false, accessToken: '' });

    return <GlobalContext.Provider value={{ authUser, setAuthUser }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);
