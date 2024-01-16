'use client';
import { FC, useState, useEffect } from 'react';
import Calendar from '../../../../components/ui/Calendar';
import { authStore } from '@/store/authStore';
import Modal from '@/components/ui/Modal';
import { BookingCalendarEvent } from '@/interfaces/components';
import { Booking } from '@/interfaces/booking';
import BookingInfo from './BookingInfo';
import { BookingStatuses } from 'enums/booking';

interface ProfileCalendarProps {
  bookings: Booking[];
  refetch: any;
}

const ProfileCalendar: FC<ProfileCalendarProps> = ({ bookings, refetch }) => {
  const [events, setEvents] = useState<BookingCalendarEvent[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const events: BookingCalendarEvent[] = bookings?.map((booking) => {
      return {
        title: booking?.user?.firstname + ' ' + booking?.user?.lastname,
        resourceId: booking.id,
        id: booking.id,
        date: new Date(booking.date),
        startEditable: true,
        durationEditable: true,
        color: booking.status == BookingStatuses.CANCELLED ? 'red' : '',

        // start: booking.start,
        // end: booking.end,
      };
    });
    setEvents(events);
  }, [bookings]);

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
    <div style={{ width: '100%' }}>
      <Modal
        title={`${selectedBooking?.user?.firstname} ${selectedBooking?.user?.lastname}`}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        closeTitle="Close"
      >
        <BookingInfo onCancel={handleCancel} onDateChange={handleDateChange} booking={selectedBooking as Booking} />
      </Modal>
      <Calendar onDateClick={handleDateClick} onEventClick={handleEventClick} view="profile" events={events} />
    </div>
  );
};

export default ProfileCalendar;
