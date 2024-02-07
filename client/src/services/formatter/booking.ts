import { Booking, BookingParticipant, BookingPeriod } from '@/interfaces/booking';
import { formatMeet } from './../formatter/meet';
import { formatProfile } from './profile';
import { formatUser } from './user';
import { v4 as uuidv4 } from 'uuid';

export const formatBooking = (booking: any): Booking => {
  return {
    id: booking._id,
    profile: formatProfile(booking.profileId),
    meet: formatMeet(booking.meetId),
    date: booking.date,
    location: booking.location,
    status: booking.status,
    participants: formatParticipants(booking.participants),
    activity: formatActivities(booking.activities),
    createdAt: booking.createdAt,
  };
};

const formatParticipants = (participants: any[]): any[] => {
  return participants.map((participant) => {
    return {
      id: participant._id,
      user: formatUser(participant.userId),
      notes: participant?.notes || '',
      createdAt: participant.createdAt,
    };
  });
};

const formatActivities = (activities: any[]): any[] => {
  return activities.map((activity) => {
    return {
      id: activity._id,
      type: activity.type,
      role: activity.role,
      // user: formatUser(activity?.userId),
      description: activity.description,
      createdAt: activity.createdAt,
    };
  });
};

export const formatAvailablePeriods = (periods: any[]): BookingPeriod[] => {
  return periods.map((period) => {
    return {
      date: period.date,
      periods: period.periods.map((period: any) => {
        return {
          id: uuidv4(),
          value: period,
        };
      }),
    };
  });
};
