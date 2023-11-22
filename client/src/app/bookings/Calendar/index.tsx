'use client';

import { FC, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Booking } from '@/interfaces/booking';

interface CalendarProps {
  bookings: Booking[] | undefined;
  view: 'user' | 'profile';
}

const Calendar: FC<CalendarProps> = ({ view, bookings }) => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (bookings) {
      const events = bookings.map((booking) => {
        return {
          title: booking?.user?.firstname + ' ' + booking?.user?.lastname,
          resourceId: booking.id,
          date: booking.date,
          // start: booking.start,
          // end: booking.end,
          startEditable: true,
          durationEditable: true,
        };
      });
      setEvents(events);
    }
  }, [bookings]);

  const handleDateClick = (arg: any) => {
    console.log(arg);
  };

  const handleEventClick = (arg: any) => {
    console.log(arg);
  };
  return (
    <div>
      <FullCalendar
        allDaySlot={false}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        slotDuration={'00:15:00'}
        selectable={true}
        dateClick={handleDateClick}
        events={events}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
