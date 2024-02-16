import { BookingStatuses } from "enums/booking";
import { Booking } from "interfaces/booking";
import { useEffect, useCallback, useState } from "react";

export const useBooking = (booking: Booking | null = null) => {
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (!booking) return;
    setIsEditable(checkIfEditable(booking));
  }, [booking]);

  const checkIfEditable = useCallback((booking: Booking) => {
    const editable =
      booking.status != BookingStatuses.CANCELLED && new Date(booking.date) > new Date();
    return editable;
  }, []);

  const eventColor = useCallback((booking: Booking) => {
    if (new Date(booking.date) > new Date()) return "green";
    if (new Date(booking.date) < new Date()) return "grey";
    if (booking.status == BookingStatuses.CANCELLED) return "red";
  }, []);

  return { isEditable, eventColor, checkIfEditable };
};
