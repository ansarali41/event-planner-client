'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import PaymentModal from '../Components/payment-modal';
import Sidebar from '../Components/sidebar/sidebar';
import isAuth from '../Utils/Auth/IsAuth';
import { useGlobalContext } from '../context/context';

const Feed = () => {
    const router = useRouter();
    const { authUser, setAuthUser } = useGlobalContext();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.post(
                    'http://localhost:4000/event/public/findAll',
                    {
                        isPaid: false,
                        status: false,
                    },
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
    }, [authUser.accessToken]);

    return (
        <div>
            <ToastContainer />
            <Sidebar />

            <div className="p-4 sm:ml-64">
                <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Feeds</h5>

                <div className="grid grid-cols-2 gap-4">
                    {events.length ? (
                        events.map(event => (
                            <div className="my-3" key={event?.id}>
                                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                    <div className="px-6 py-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <Link href={`/dashboard/event-details/${event?.id}`}>
                                                <div className="font-bold text-xl">{event?.title}</div>
                                            </Link>
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
                                            <div>
                                                <Link href={`/dashboard/event-details/${event?.id}`}>
                                                    <button
                                                        type="button"
                                                        className="text-gray-900 bg-white border border-blue-300 focus:outline-none hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-600 dark:focus:ring-blue-700"
                                                    >
                                                        See More
                                                    </button>
                                                </Link>
                                            </div>
                                            <PaymentModal amount={event?.budget} eventId={event.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <h1 className="text-yellow-400 text-center">No feeds available now...</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default isAuth(Feed);
