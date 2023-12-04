'use client';
import { useRouter } from 'next/navigation';
import isAuth from '../../../Utils/Auth/IsAuth';
import { useGlobalContext } from '../../../context/context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMap from '@/app/Components/google-map';
import Sidebar from '@/app/Components/sidebar/sidebar';

// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from '@/app/Components/CheckoutForm';

// const stripePromise = loadStripe('pk_test_51Ha1hsEGLbU7xdvfaEFs0QLW43c6o73yJ7HXHlkOQkWGoBNu6qBnhLwluQOErLRpcv2NS8mTOnalPENDGoOEdG3V00YHX2mT5u');

const EventDetails = ({ params }) => {
    const router = useRouter();
    const { authUser, setAuthUser } = useGlobalContext();
    const [credentials, setCredentials] = useState({
        title: '',
        description: '',
        location: '',
        budget: 0,
        type: '',
        date: '',
        status: 0,
        venue: '',
    });

    const [errors, setErrors] = useState({});
    const [event, setEvent] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/event/public/${params.id}`, {
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
                        venue: data?.venue,
                    });
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [authUser.accessToken, params.id]);

    // user logout
    const handleLogOut = () => {
        setAuthUser({ user_id: '', email: '', isLoggedIn: false, accessToken: '' });
        router.push('/login');
    };

    // event purchased user list
    const [eventPurchaseUser, setEventPurchaseUser] = useState(null);
    useEffect(() => {
        // Fetch the payment intent client secret from your backend
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/payment/${event.budget}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authUser.accessToken,
                    },
                });

                setEventPurchaseUser(data.eventPurchaseUser);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [authUser.accessToken, event?.budget]);

    return (
        <div>
            <main className="">
                <Sidebar />

                <div className="p-4 sm:ml-64 pt-0">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                            <div className="flex justify-between items-center px-4 py-5 sm:px-6">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Event Details</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Details and information about the event.</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Event name</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{credentials?.title ?? '...'}</dd>
                                    </div>

                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Event Description</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{credentials?.description ?? ''}</dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Event Budget</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{credentials?.budget ?? '...'} USD</dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Event Location:</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{credentials?.location ?? '...'}</dd>
                                    </div>

                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Event Venue:</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{credentials?.venue ?? '...'}</dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Event status:</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {!credentials?.status ? (
                                                <span className="text-green-400 font-bold "> Done</span>
                                            ) : (
                                                <span className="text-yellow-400 font-bold "> On going</span>
                                            )}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Event Type:</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{credentials?.type ?? '...'}</dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Event Date:</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{credentials?.date ?? '...'}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <div className="div">
                            <GoogleMap latitude={event?.latitude} longitude={event?.longitude} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default isAuth(EventDetails);
