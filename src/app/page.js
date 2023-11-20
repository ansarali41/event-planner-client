'use client';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import LoginPage from './login/page';

export default function Home() {
    useLayoutEffect(() => {
        redirect('/login');
    }, []);
    return <LoginPage />;
}
