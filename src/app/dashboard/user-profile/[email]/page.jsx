'use client';
import { useRouter } from 'next/navigation';
import isAuth from '../../../Utils/Auth/IsAuth';
import { useGlobalContext } from '../../../context/context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/app/Components/sidebar/sidebar';

const UserProfileEdit = ({ params }) => {
    const router = useRouter();
    const { authUser, setAuthUser } = useGlobalContext();
    const [credentials, setCredentials] = useState({
        full_name: '',
        username: '',
        mobile: '',
    });

    const [errors, setErrors] = useState({});
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/users/${params.email}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authUser.accessToken,
                    },
                });

                if (data) {
                    setUserProfile(data);
                    setCredentials({
                        full_name: data?.full_name,
                        username: data?.username,
                        mobile: data?.mobile,
                    });
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [authUser.accessToken, params.email]);

    const handleCreateForm = async evt => {
        evt.preventDefault();
        setErrors(errors => ({ ...validateCredentials(credentials) }));

        try {
            const { data } = await axios.put(
                `http://localhost:4000/users/${userProfile.id}`,
                {
                    full_name: credentials.full_name,
                    username: credentials.username,
                    mobile: credentials.mobile,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authUser.accessToken,
                    },
                },
            );
            if (data) {
                router.push('/dashboard/user-profile');
            }
        } catch (error) {
            throw error.message;
        }
    };

    const validateCredentials = credentials => {
        let errors = {};
        console.log('errors', errors);

        if (credentials.full_name.length < 5) {
            errors = Object.assign(errors, {
                email: 'This field is required',
            });
        }

        if (credentials.username.length < 5) {
            errors = Object.assign(errors, {
                password: 'This field is required',
            });
        }
        if (credentials.mobile.length < 5) {
            errors = Object.assign(errors, {
                password: 'This field is required',
            });
        }

        return errors;
    };

    const handleInputChange = evt => {
        evt.preventDefault();
        setCredentials(credentials => ({ ...credentials, [evt.target.name]: evt.target.value }));
    };

    // user logout
    const handleLogOut = () => {
        setAuthUser({ user_id: '', email: '', isLoggedIn: false, accessToken: '' });
        router.push('/login');
    };

    return (
        <div>
            <main className="">
                <Sidebar />
                <div className="p-4 sm:ml-64 pt-0">
                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit User Profile</h2>
                            <form onSubmit={handleCreateForm.bind(this)}>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            id="full_name"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' +
                                                (errors.hasOwnProperty('full_name') ? 'border-red-500' : '')
                                            }
                                            placeholder="Type Full Name"
                                            value={credentials.full_name}
                                            onChange={handleInputChange.bind(this)}
                                        />
                                        {errors.hasOwnProperty('full_name') && <p className="text-red-500 text-xs italic">{errors.full_name}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' +
                                                (errors.hasOwnProperty('username') ? 'border-red-500' : '')
                                            }
                                            placeholder="Type username"
                                            value={credentials.username}
                                            onChange={handleInputChange.bind(this)}
                                        />
                                        {errors.hasOwnProperty('username') && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Mobile
                                        </label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            id="mobile"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' +
                                                (errors.hasOwnProperty('mobile') ? 'border-red-500' : '')
                                            }
                                            placeholder="Type mobile number"
                                            value={credentials.mobile}
                                            onChange={handleInputChange.bind(this)}
                                        />
                                        {errors.hasOwnProperty('mobile') && <p className="text-red-500 text-xs italic">{errors.mobile}</p>}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default isAuth(UserProfileEdit);
