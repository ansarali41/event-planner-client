'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
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
                    'http://localhost:4000/event/public/findAll-others',
                    {
                        isPaid: true,
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
    }, [authUser.accessToken, authUser.user_id]);

    return (
        <div>
            <ToastContainer />
            <Sidebar />

            <div className="p-4 sm:ml-64">
                <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">All events paid by user</h5>

                <div>
                    <div className="p-8">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Event ID
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Event Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            paid by
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            status
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.length ? (
                                        events.map(event => (
                                            <tr key={event.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {event?.id}
                                                </th>
                                                <td class="px-6 py-4">{event?.title}</td>
                                                <td class="px-6 py-4">{event?.userEmail}</td>
                                                <td class="px-6 py-4">
                                                    {event?.status ? (
                                                        <span className="text-green-400 font-bold "> Done</span>
                                                    ) : (
                                                        <span className="text-yellow-400 font-bold "> On going</span>
                                                    )}
                                                </td>
                                                <td class="px-6 py-4">${event?.budget}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <div>
                                            <h1 className="text-yellow-400 text-center">No event purchased</h1>
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default isAuth(Feed);
