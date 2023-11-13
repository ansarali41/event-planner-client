'use client';
import { redirect } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

export const authUserContext = createContext();

export default function isAuth(Component) {
    return function IsAuth(props) {
        const [authUser, setAuthUser] = useState({
            email: '',
            isLoggedIn: false,
        });

        useEffect(() => {
            if (!authUser.isLoggedIn) {
                return redirect('/login');
            }
        }, [authUser]);

        return (
            <authUserContext.Provider value={{ authUser, setAuthUser }}>
                <Component {...props} />;
            </authUserContext.Provider>
        );
    };
}
