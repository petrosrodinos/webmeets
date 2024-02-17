import { BookingStatuses } from "enums/booking";
import { Booking } from "interfaces/booking";
import { useEffect, useCallback, useState } from "react";

export const useBooking = (booking: Booking | null = null) => {
  const [isEditable, setIsEditable] = useState(false);
  const [canJoin, setCanJoin] = useState(false);
  const millisecondsInMinute = 60000; // 1 minute = 60,000 milliseconds

  useEffect(() => {
    if (!booking) return;
    setCanJoin(checkCanJoin(booking));
    setIsEditable(checkIfEditable(booking));
  }, [booking]);

  const checkIfEditable = useCallback((booking: Booking) => {
    const editable =
      booking.status != BookingStatuses.CANCELLED && new Date(booking.date) > new Date();
    return editable;
  }, []);

  const checkCanJoin = useCallback((booking: Booking) => {
    const canJoin =
      new Date(booking.date) <= new Date() &&
      new Date().getTime() <
        new Date(booking.date).getTime() + booking.meet.duration * millisecondsInMinute;
    return canJoin;
  }, []);

  const eventColor = useCallback((booking: Booking) => {
    if (booking.status == BookingStatuses.CANCELLED) return "red";
    // const newD = new Date(booking.date);
    // newD.setTime(newD.getTime() + booking.meet.duration * millisecondsInMinute);
    // console.log("asd", new Date(), newD);
    if (
      new Date().getTime() <
      new Date(booking.date).getTime() + booking.meet.duration * millisecondsInMinute
    ) {
      return "green";
    } else {
      return "grey";
    }
  }, []);

  return { isEditable, canJoin, eventColor, checkIfEditable };
};
