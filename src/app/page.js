'use client';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function Home() {
    useLayoutEffect(() => {
        redirect('/login');
    }, []);
    return (
        <main className="flex justify-center items-center max-h-screen">
            <div>
                <h1>Loading....</h1>
            </div>
        </main>
    );
}
