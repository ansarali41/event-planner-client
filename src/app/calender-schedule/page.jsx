'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../Components/sidebar/sidebar';
import isAuth from '../Utils/Auth/IsAuth';
import { useGlobalContext } from '../context/context';

// full calendar imports
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalenderAndSchedule = () => {
    const router = useRouter();
    const { authUser, setAuthUser } = useGlobalContext();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.post(
                    'http://localhost:4000/event/public/findAll',
                    { isPaid: true, paidBy: authUser.user_id },
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
                <h5 className="m-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Calender and Schedule of my events</h5>

                <div className="m-4">
                    <Fullcalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={'dayGridMonth'}
                        headerToolbar={{
                            start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
                            center: 'title',
                            end: 'dayGridMonth,timeGridWeek,timeGridDay', // will normally be on the right. if RTL, will be on the left
                        }}
                        height={'75vh'}
                        events={events}
                    />
                </div>
            </div>
        </div>
    );
};

export default isAuth(CalenderAndSchedule);
