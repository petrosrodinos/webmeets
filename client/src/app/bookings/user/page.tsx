'use client';
import { FC, useState } from 'react';
import Calendar from '../../../components/ui/Calendar';
import { getBookings } from '@/services/booking';
import { useQuery } from 'react-query';
import { authStore } from '@/store/authStore';
import Spinner from '@/components/ui/Spinner';
import { Booking } from '@/interfaces/booking';
import Modal from '@/components/ui/Modal';
import BookingInfo from './BookingInfo';
import { BookingCalendarEvent } from '@/interfaces/components';
import '../style.css';

const User: FC = () => {
  const { userId } = authStore();
  const [events, setEvents] = useState<BookingCalendarEvent[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const { data: bookings, isLoading } = useQuery('user-bookings', () => getBookings({ userId }), {
    onSuccess: (data) => {
      if (data) {
        const events = data.map((booking) => {
          return {
            title: booking.meet.name,
            resourceId: booking.id,
            id: booking.id,
            date: booking.date,
            startEditable: false,
            durationEditable: false,
            className: 'event-item',
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
    const bookingId = arg.event._def.publicId;
    const booking = bookings?.find((booking) => booking.id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
    }
  };

  return (
    <>
      <Spinner loading={isLoading} />
      <Modal
        title={selectedBooking?.meet?.name as string}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        closeTitle="Close"
      >
        <BookingInfo booking={selectedBooking as Booking} />
      </Modal>
      <Calendar onDateClick={handleDateClick} onEventClick={handleEventClick} view="user" events={events} />
    </>
  );
};

export default User;
