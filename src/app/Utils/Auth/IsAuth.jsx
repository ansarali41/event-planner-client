'use client';
import { useGlobalContext } from '@/app/context/context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function isAuth(Component) {
    return function IsAuth(props) {
        const router = useRouter();
        const { authUser, setAuthUser } = useGlobalContext();
        useEffect(() => {
            if (!authUser.isLoggedIn) {
                router.push('/login');
            }
        }, [authUser, router]);

        return <Component {...props} />;
    };
}
