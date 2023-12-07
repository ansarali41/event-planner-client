import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar({ data }) {
    return (
        <div>
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={'dayGridMonth'}
                headerToolbar={{
                    start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay', // will normally be on the right. if RTL, will be on the left
                }}
                height={'75vh'}
                events={[
                    { title: 'event 1', date: '2023-12-10' },
                    { title: 'event 2', date: '2019-04-02' },
                ]}
            />
        </div>
    );
}

export default Calendar;
