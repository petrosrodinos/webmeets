'use client';
import { FC, useState } from 'react';
import Calendar from '../../../components/ui/Calendar';
import { getBookings } from '@/services/booking';
import { useQuery } from 'react-query';
import { authStore } from '@/store/authStore';
import Spinner from '@/components/ui/Spinner';

const User: FC = () => {
  const { userId } = authStore();
  const [events, setEvents] = useState<any[]>([]);

  const { data: bookings, isLoading } = useQuery('bookings', () => getBookings({ userId }), {
    onSuccess: (data) => {
      if (data) {
        const events = data.map((booking) => {
          return {
            title: booking.meet.name,
            resourceId: booking.id,
            date: booking.date,
            startEditable: false,
            durationEditable: false,
            // start: booking.start,
            // end: booking.end,
          };
        });
        setEvents(events);
      }
    },
  });

  const handleDateClick = (arg: any) => {
    console.log(arg);
  };

  const handleEventClick = (arg: any) => {
    console.log(arg);
  };

  return (
    <>
      <Spinner loading={isLoading} />
      <Calendar onDateClick={handleDateClick} onEventClick={handleEventClick} view="user" events={events} />
    </>
  );
};

export default User;
