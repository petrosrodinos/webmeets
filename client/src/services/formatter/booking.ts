import { Booking } from '@/interfaces/booking';
import { formatMeet } from './../formatter/meet';
import { formatProfile } from './profile';
import { formatUser } from './user';
import { formatDate } from '@/lib/date';

export const formatBooking = (booking: any): Booking => {
  return {
    id: booking._id,
    user: formatUser(booking.userId),
    profile: formatProfile(booking.profileId),
    meet: formatMeet(booking.meetId),
    date: booking.date,
    notes: booking.notes,
    status: booking.status,
    participants: booking.participants,
    createdAt: formatDate(booking.createdAt),
  };
};
