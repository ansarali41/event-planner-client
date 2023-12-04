'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import isAuth from '../../Utils/Auth/IsAuth';
import { useGlobalContext } from '../../context/context';
import Sidebar from '@/app/Components/sidebar/sidebar';

const venueData = {
    Toronto: {
        venue: 'Toronto',
        latitude: '43.653225',
        longitude: '-79.383186',
    },
    Montreal: {
        venue: 'Montreal',
        latitude: '45.501689',
        longitude: '-73.567256',
    },
    Calgary: {
        venue: 'Calgary',
        latitude: '51.0447',
        longitude: '-114.0719',
    },
    Ottawa: {
        venue: 'Ottawa',
        latitude: '45.42153',
        longitude: '-75.699253',
    },
    Edmonton: {
        venue: 'Edmonton',
        latitude: '53.5461',
        longitude: '-113.4938',
    },
    Mississauga: {
        venue: 'Mississauga',
        latitude: '43.5890',
        longitude: '-79.6441',
    },
    'North York': {
        venue: 'North York',
        latitude: '43.7615',
        longitude: '-79.4111',
    },
    Winnipeg: {
        venue: 'Winnipeg',
        latitude: '49.8951',
        longitude: '-97.1384',
    },
    Scarborough: {
        venue: 'Scarborough',
        latitude: '43.7731',
        longitude: '-79.2576',
    },
    Vancouver: {
        venue: 'Vancouver',
        latitude: '49.2827',
        longitude: '-123.1207',
    },
};

const CreateEvent = () => {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ title: '', description: '', location: '', budget: 0, type: '', date: '', venue: '', latitude: '', longitude: '' });
    const [errors, setErrors] = useState({});
    const { authUser, setAuthUser } = useGlobalContext();

    const handleCreateForm = async evt => {
        evt.preventDefault();
        setErrors(errors => ({ ...validateCredentials(credentials) }));

        try {
            const { data } = await axios.post(
                'http://localhost:4000/event',
                {
                    title: credentials.title,
                    description: credentials.description,
                    location: credentials.location,
                    budget: credentials.budget,
                    type: credentials.type,
                    date: credentials.date.toString(),
                    venue: credentials.venue,
                    latitude: credentials.latitude,
                    longitude: credentials.longitude,
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

    const handleVenueChange = e => {
        const newVenue = venueData[e.target.value];
        console.log('newVenue', newVenue);
        setCredentials(credentials => ({ ...credentials, venue: newVenue.venue, latitude: newVenue.latitude, longitude: newVenue.longitude }));
    };
    console.log('credentials', credentials);
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
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create an new Event</h2>
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
                                            Select Venue
                                        </label>

                                        <select
                                            id="venue"
                                            name="venue"
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                                                errors.hasOwnProperty('venue') ? 'border-red-500' : ''
                                            }`}
                                            onChange={e => handleVenueChange(e)}
                                        >
                                            <option selected>Choose a venue</option>
                                            <option value="Toronto">Toronto</option>
                                            <option value="Montreal">Montreal</option>
                                            <option value="Calgary">Calgary</option>
                                            <option value="Ottawa">Ottawa</option>
                                            <option value="Edmonton">Edmonton</option>
                                            <option value="Mississauga">Mississauga</option>
                                            <option value="North York">North York</option>
                                            <option value="Winnipeg">Winnipeg</option>
                                            <option value="Scarborough">Scarborough</option>
                                            <option value="Vancouver">Vancouver</option>
                                        </select>

                                        {errors.hasOwnProperty('venue') && <p className="text-red-500 text-xs italic">{errors.venue}</p>}
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
                                    Create Event
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default isAuth(CreateEvent);
