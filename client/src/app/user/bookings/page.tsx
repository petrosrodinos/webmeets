'use client';
import { FC, useState } from 'react';
import Calendar from '../../../components/ui/Calendar';
import { getBookings } from '@/services/booking';
import { useQuery } from 'react-query';
import { authStore } from '@/store/authStore';
import Spinner from '@/components/ui/Spinner';
import { Booking } from '@/interfaces/booking';
import Modal from '@/components/ui/Modal';
import { BookingCalendarEvent } from '@/interfaces/components';
import BookingInfo from './BookingInfo';
import { BookingStatuses } from 'enums/booking';

const UserBookings: FC = () => {
  const { userId } = authStore();
  const [events, setEvents] = useState<BookingCalendarEvent[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const {
    data: bookings,
    isLoading,
    refetch,
  } = useQuery('user-bookings', () => getBookings({ userId }), {
    onSuccess: (data) => {
      if (data) {
        const events = data.map((booking) => {
          return {
            id: booking.id,
            title: booking.meet.name,
            date: new Date(booking.date),
            resourceId: booking.id,
            startEditable: false,
            durationEditable: false,
            className: 'event-item',
            color: booking.status == BookingStatuses.CANCELLED ? 'red' : '',
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

  const handleDateChange = () => {
    refetch();
  };

  const handleCancel = () => {
    refetch();
    setSelectedBooking(null);
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
        <BookingInfo onCancel={handleCancel} onDateChange={handleDateChange} booking={selectedBooking as Booking} />
      </Modal>
      <Calendar onDateClick={handleDateClick} onEventClick={handleEventClick} view="user" events={events} />
    </>
  );
};

export default UserBookings;
