'use client';
import { FC } from 'react';
import Calendar from '../Calendar';
import { getBookings } from '@/services/booking';
import { useQuery } from 'react-query';
import { authStore } from '@/store/authStore';
import Spinner from '@/components/ui/Spinner';

const User: FC = () => {
  const { userId } = authStore();
  const { data: bookings, isLoading } = useQuery('bookings', () => getBookings({ userId }));
  return (
    <>
      <Spinner loading={isLoading} />
      <Calendar view="user" bookings={bookings} />
    </>
  );
};

export default User;
