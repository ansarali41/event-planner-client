'use client';
import { useRouter } from 'next/navigation';
import isAuth from '../Utils/Auth/IsAuth';
import { useGlobalContext } from '../context/context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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
    }, [authUser.accessToken, events, isUpdate]);

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
            <ToastContainer />
            <div className="flex justify-around items-center py-3">
                <h2 className="mb-4 ml-10 text-xl font-bold text-gray-900 dark:text-white">Event Planner</h2>
                <h1>
                    <span className="bg-blue-100 text-blue-800 text font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                        {authUser.email}
                    </span>
                </h1>
            </div>
            <main className="">
                <button
                    data-drawer-target="sidebar-multi-level-sidebar"
                    data-drawer-toggle="sidebar-multi-level-sidebar"
                    aria-controls="sidebar-multi-level-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </button>

                <aside
                    id="sidebar-multi-level-sidebar"
                    className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center p-2 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 group"
                                >
                                    <svg
                                        className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 21"
                                    >
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span className="ms-3">Dashboard</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/dashboard/create-event"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Create an event</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/dashboard/user-profile"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                                        />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">User Profile</span>
                                </Link>
                            </li>
                            <li onClick={() => handleLogOut()}>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                        />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="p-4 sm:ml-64">
                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Event List</h5>
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
                                                <span className="text-yellow-400 font-bold "> Pending</span>
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
