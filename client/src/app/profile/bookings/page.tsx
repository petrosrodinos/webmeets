'use client';
import { FC, useState } from 'react';
import Calendar from '../../../components/ui/Calendar';
import { getBookings } from '@/services/booking';
import { useQuery } from 'react-query';
import { authStore } from '@/store/authStore';
import Spinner from '@/components/ui/Spinner';
import Modal from '@/components/ui/Modal';
import { BookingCalendarEvent } from '@/interfaces/components';
import { Booking } from '@/interfaces/booking';
import BookingInfo from './BookingInfo';

const ProfileBookings: FC = () => {
  const { profileId } = authStore();
  const [events, setEvents] = useState<BookingCalendarEvent[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const { data: bookings, isLoading } = useQuery('profile-bookings', () => getBookings({ profileId }), {
    onSuccess: (data) => {
      if (data) {
        const events: BookingCalendarEvent[] = data.map((booking) => {
          return {
            title: booking?.user?.firstname + ' ' + booking?.user?.lastname,
            resourceId: booking.id,
            id: booking.id,
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
        title={`${selectedBooking?.user?.firstname} ${selectedBooking?.user?.lastname}`}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        closeTitle="Close"
      >
        <BookingInfo booking={selectedBooking as Booking} />
      </Modal>
      <Calendar onDateClick={handleDateClick} onEventClick={handleEventClick} view="profile" events={events} />
    </>
  );
};

export default ProfileBookings;
