import { FC, useState, useEffect, useMemo } from "react";
import Calendar from "components/ui/Calendar";
import Modal from "components/ui/Modal";
import { BookingCalendarEvent } from "interfaces/components";
import { Booking } from "interfaces/booking";
import BookingInfo from "./BookingInfo";
import { BookingStatuses } from "enums/booking";

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
        title: bookingName || booking.meet.name,
        resourceId: booking.id,
        id: booking.id,
        date: new Date(booking.date),
        startEditable: true,
        durationEditable: true,
        color: eventColor(booking),

        // start: booking.start,
        // end: booking.end,
      };
    });
    setEvents(events);
  }, [bookings]);

  const eventColor = (booking: Booking) => {
    if (booking.date > new Date().toUTCString()) return "green";
    if (booking.date < new Date().toUTCString()) return "grey";
    if (booking.status == BookingStatuses.CANCELLED) return "red";
  };

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

  const bookingName = useMemo(() => {
    if (!bookings || bookings?.length === 0) return;
    const booking = bookings[0];
    const user = booking.participants[0].user;
    const userName = `${user.firstname} ${user.lastname}`;
    if (booking.participants.length > 1) {
      return `${userName} + ${booking.participants.length - 1} more`;
    } else {
      return userName;
    }
  }, [bookings]);

  return (
    <div style={{ width: "100%" }}>
      <Modal
        title={selectedBooking?.meet?.name || "Booking"}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        closeTitle="Close"
      >
        <BookingInfo
          onCancel={handleCancel}
          onDateChange={handleDateChange}
          booking={selectedBooking as Booking}
        />
      </Modal>
      <Calendar
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
        view="profile"
        events={events}
      />
    </div>
  );
};

export default ProfileCalendar;
