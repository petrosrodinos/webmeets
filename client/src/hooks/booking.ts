import { BookingStatuses } from "enums/booking";
import { Booking } from "interfaces/booking";
import { useMemo } from "react";

export const useBooking = (booking: Booking) => {
  const isEditable = useMemo(() => {
    const editable =
      booking.status != BookingStatuses.CANCELLED && new Date(booking.date) > new Date();
    return editable;
  }, [booking]);

  return { isEditable };
};
