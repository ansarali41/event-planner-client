'use client';
import { useRouter } from 'next/navigation';
import isAuth from '../Utils/Auth/IsAuth';
import { useGlobalContext } from '../context/context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../Components/sidebar/sidebar';

const Dashboard = () => {
    const router = useRouter();
    const { authUser, setAuthUser } = useGlobalContext();
    const [events, setEvents] = useState([]);
    const [isUpdate, setIsUpdate] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.post(
                    'http://localhost:4000/event/findAll',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: authUser.accessToken,
                        },
                    },
                );

                if (data) {
                    setEvents(data.data);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [authUser.accessToken, isUpdate]);

    const handleLogOut = () => {
        setAuthUser({ user_id: '', email: '', isLoggedIn: false, accessToken: '' });
        router.push('/login');
    };

    const handleDeleteAnEvent = async id => {
        const { data } = await axios.delete(`http://localhost:4000/event/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authUser.accessToken,
            },
        });

        if (data?.statusCode === 200) {
            const deleteEventNotification = () => toast.success('Event deleted successfully');
            deleteEventNotification();
        }
    };
    const handleUpdateStatusAnEvent = async id => {
        const { data } = await axios.put(
            `http://localhost:4000/event/${id}`,
            {
                status: true,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authUser.accessToken,
                },
            },
        );

        if (data?.statusCode === 202) {
            setIsUpdate(!isUpdate);

            const deleteEventNotification = () => toast.success('Event Status Changed From pending to Done');
            deleteEventNotification();
        }
    };

    return (
        <div>
            <main className="">
                <Sidebar />
                <div className="p-4 sm:ml-64">
                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Manage my event</h5>
                    <div className="grid grid-cols-2 gap-4">
                        {events.map(event => (
                            <div className="my-3" key={event?.id}>
                                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                    <div className="px-6 py-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <Link href={`/dashboard/event-details/${event?.id}`}>
                                                <div className="font-bold text-xl">{event?.title}</div>
                                            </Link>
                                            <div>
                                                <Link href={`/dashboard/event-details/${event?.id}`}>
                                                    <button className="bg-blue-500 hover:bg-blue-700 mx-1 text-white font-bold py-2 px-4 rounded">Details</button>
                                                </Link>
                                                <Link href={`/dashboard/${event?.id}`}>
                                                    <button className="bg-blue-500 hover:bg-blue-700 mx-1 text-white font-bold py-2 px-4 rounded">Edit</button>
                                                </Link>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-base mb-2">
                                            Status:
                                            {event?.status ? (
                                                <span className="text-green-400 font-bold "> Done</span>
                                            ) : (
                                                <span className="text-yellow-400 font-bold "> On going</span>
                                            )}
                                        </p>
                                        <p className="text-gray-700 text-base mb-2">Location: {event?.location}</p>
                                        <p className="text-gray-700 text-base mb-2">Description: {event?.description}</p>
                                        <p className="text-gray-700 text-base mb-2">Budget: ${event?.budget}</p>
                                        <p className="text-gray-700 text-base mb-2">Date: {event?.date}</p>
                                        <p className="text-gray-700 text-base mb-2">Type: {event?.type}</p>

                                        <div className="flex justify-between items-center">
                                            {event?.status ? (
                                                <div></div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                    onClick={() => handleUpdateStatusAnEvent(event?.id)}
                                                >
                                                    Complete
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                onClick={() => handleDeleteAnEvent(event?.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default isAuth(Dashboard);
