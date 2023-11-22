'use client';

import { FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarProps {
  view: 'user' | 'profile';
}

const Calendar: FC<CalendarProps> = ({ view }) => {
  const handleDateClick = (arg: any) => {
    console.log(arg);
  };

  const handleEventClick = (arg: any) => {
    console.log(arg);
  };
  return (
    <div>
      <FullCalendar
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        slotDuration={'00:15:00'}
        selectable={true}
        dateClick={handleDateClick}
        events={[
          {
            title: 'event 1',
            resourceId: 'a',
            color: 'red',
            textColor: 'white',
            start: '2023-11-22T02:00:00',
            end: '2023-11-22T04:00:00',
            startEditable: true,
            durationEditable: true,
          },
          { title: 'event 2', start: '2023-11-23T02:00:00', end: '2023-11-23T04:00:00' },
        ]}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
