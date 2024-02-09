import { FC, useEffect, useMemo, useState } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Tab } from '@chakra-ui/react';
import Modal from '@/components/ui/Modal';
import BookingInfo from '../Calendar/BookingInfo';
import { Booking } from '@/interfaces/booking';
import { formatDate } from '@/lib/date';

interface ProfileListProps {
  bookings: Booking[];
  refetch: any;
}
const ProfileList: FC<ProfileListProps> = ({ bookings, refetch }) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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

  const handleDateChange = () => {
    refetch();
  };

  const handleCancel = () => {
    refetch();
    setSelectedBooking(null);
  };

  const handleBooking = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  return (
    <>
      <Modal
        title={selectedBooking?.meet?.name || 'Booking'}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        closeTitle="Close"
      >
        <BookingInfo onCancel={handleCancel} onDateChange={handleDateChange} booking={selectedBooking as Booking} />
      </Modal>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Meet</Th>
              <Th>Participants</Th>
              <Th>Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings &&
              bookings.map((booking) => {
                return (
                  <>
                    <Tr
                      _hover={{ cursor: 'pointer', color: 'blue.500' }}
                      onClick={() => {
                        handleBooking(booking);
                      }}
                    >
                      <Td>{bookingName || booking.meet.name}</Td>
                      <Td>{booking.meet.name}</Td>
                      <Td>{booking.participants.length}</Td>
                      <Td>{formatDate(booking.date)}</Td>
                      <Td>{booking.status}</Td>
                    </Tr>
                  </>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProfileList;
