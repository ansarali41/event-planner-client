'use client';
import { useRouter } from 'next/navigation';
import isAuth from '../../Utils/Auth/IsAuth';
import { useGlobalContext } from '../../context/context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/app/Components/sidebar/sidebar';

const UserProfile = () => {
    const router = useRouter();
    const { authUser, setAuthUser } = useGlobalContext();
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/users/${authUser.email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authUser.accessToken,
                    },
                });

                if (data) {
                    setUserProfile(data);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [authUser.accessToken, authUser.email]);

    const handleLogOut = () => {
        setAuthUser({ user_id: '', email: '', isLoggedIn: false, accessToken: '' });
        router.push('/login');
    };
    return (
        <div>
            <main className="">
                <Sidebar />

                <div className="p-4 sm:ml-64">
                    <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                        <div className="flex justify-between items-center px-4 py-5 sm:px-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Details and information about user.</p>
                            </div>
                            <div>
                                <Link href={`/dashboard/user-profile/${authUser?.email}`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                </Link>
                            </div>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userProfile?.full_name ?? '...'}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{authUser?.email}</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Mobile</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userProfile?.mobile ?? '...'}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">User name:</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userProfile?.username ?? '...'}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default isAuth(UserProfile);
