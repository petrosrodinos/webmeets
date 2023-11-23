'use client';
import { FC, useState } from 'react';
import Calendar from '../../../components/ui/Calendar';
import { getBookings } from '@/services/booking';
import { useQuery } from 'react-query';
import { authStore } from '@/store/authStore';
import Spinner from '@/components/ui/Spinner';

const Profile: FC = () => {
  const { profileId } = authStore();
  const [events, setEvents] = useState<any[]>([]);

  const { isLoading } = useQuery('bookings', () => getBookings({ profileId }), {
    onSuccess: (data) => {
      if (data) {
        const events = data.map((booking) => {
          return {
            title: booking?.user?.firstname + ' ' + booking?.user?.lastname,
            resourceId: booking.id,
            date: booking.date,
            startEditable: true,
            durationEditable: true,
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
      <Calendar onDateClick={handleDateClick} onEventClick={handleEventClick} view="profile" events={events} />
    </>
  );
};

export default Profile;
