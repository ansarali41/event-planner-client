'use client';
import { useRouter } from 'next/navigation';
import isAuth from '../../Utils/Auth/IsAuth';
import { useGlobalContext } from '../../context/context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/app/Components/sidebar/sidebar';

const EventEdit = ({ params }) => {
    const router = useRouter();
    const { authUser, setAuthUser } = useGlobalContext();
    const [credentials, setCredentials] = useState({
        title: '',
        description: '',
        location: '',
        budget: 0,
        type: '',
        date: '',
    });

    const [errors, setErrors] = useState({});
    const [event, setEvent] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/event/${params.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authUser.accessToken,
                    },
                });

                if (data) {
                    setEvent(data);
                    setCredentials({
                        title: data?.title,
                        description: data?.description,
                        location: data?.location,
                        budget: data?.budget,
                        type: data?.type,
                        date: data?.date,
                    });
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [authUser.accessToken, params.id]);

    // useEffect(() => {
    //     if (!authUser.isLoggedIn) {
    //         router.push('/login');
    //     } else {
    //         router.push('/dashboard');
    //     }
    // }, [authUser, router]);

    const handleCreateForm = async evt => {
        evt.preventDefault();
        setErrors(errors => ({ ...validateCredentials(credentials) }));

        try {
            const { data } = await axios.put(
                `http://localhost:4000/event/${params.id}`,
                {
                    title: credentials.title,
                    description: credentials.description,
                    location: credentials.location,
                    budget: credentials.budget,
                    type: credentials.type,
                    date: credentials.date.toString(),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authUser.accessToken,
                    },
                },
            );
            if (data) {
                router.push('/dashboard');
            }
        } catch (error) {
            throw error.message;
        }
    };

    const validateCredentials = credentials => {
        let errors = {};
        console.log('errors', errors);

        if (credentials.title.length < 5) {
            errors = Object.assign(errors, {
                email: 'This field is required',
            });
        }

        if (credentials.description.length < 5) {
            errors = Object.assign(errors, {
                password: 'This field is required',
            });
        }
        if (credentials.location.length < 1) {
            errors = Object.assign(errors, {
                password: 'This field is required',
            });
        }
        if (!credentials.budget) {
            errors = Object.assign(errors, {
                password: 'This field is required',
            });
        }
        if (!credentials.date) {
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
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit the event</h2>
                            <form onSubmit={handleCreateForm.bind(this)}>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' +
                                                (errors.hasOwnProperty('title') ? 'border-red-500' : '')
                                            }
                                            placeholder="Type event title"
                                            value={credentials.title}
                                            onChange={handleInputChange.bind(this)}
                                        />
                                        {errors.hasOwnProperty('title') && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Budget (USD)
                                        </label>
                                        <input
                                            type="number"
                                            name="budget"
                                            id="budget"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' +
                                                (errors.hasOwnProperty('budget') ? 'border-red-500' : '')
                                            }
                                            placeholder="Type event location"
                                            value={credentials.budget}
                                            onChange={handleInputChange.bind(this)}
                                        />
                                        {errors.hasOwnProperty('budget') && <p className="text-red-500 text-xs italic">{errors.budget}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' +
                                                (errors.hasOwnProperty('location') ? 'border-red-500' : '')
                                            }
                                            placeholder="Type event location"
                                            value={credentials.location}
                                            onChange={handleInputChange.bind(this)}
                                        />
                                        {errors.hasOwnProperty('location') && <p className="text-red-500 text-xs italic">{errors.location}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' +
                                                (errors.hasOwnProperty('date') ? 'border-red-500' : '')
                                            }
                                            placeholder="Type event date"
                                            value={credentials.date}
                                            onChange={handleInputChange.bind(this)}
                                        />
                                        {errors.hasOwnProperty('date') && <p className="text-red-500 text-xs italic">{errors.date}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Event type
                                        </label>
                                        <input
                                            type="text"
                                            name="type"
                                            id="type"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' +
                                                (errors.hasOwnProperty('type') ? 'border-red-500' : '')
                                            }
                                            placeholder="Event type"
                                            value={credentials.type}
                                            onChange={handleInputChange.bind(this)}
                                        />
                                        {errors.hasOwnProperty('description') && <p className="text-red-500 text-xs italic">{errors.type}</p>}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            name="description"
                                            id="name"
                                            className={
                                                'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' +
                                                (errors.hasOwnProperty('description') ? 'border-red-500' : '')
                                            }
                                            placeholder="Type event description"
                                            value={credentials.description}
                                            onChange={handleInputChange.bind(this)}
                                        />
                                        {errors.hasOwnProperty('description') && <p className="text-red-500 text-xs italic">{errors.description}</p>}
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

export default isAuth(EventEdit);
