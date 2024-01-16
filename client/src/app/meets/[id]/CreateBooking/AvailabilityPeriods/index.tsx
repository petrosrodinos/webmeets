import Tag from '@/components/ui/Tag';
import { BookingAvailability, BookingPeriod } from '@/interfaces/booking';
import { formatDate, formatDateAndTime } from '@/lib/date';
import { bookingAvailability } from '@/services/booking';
import { Alert, AlertIcon, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { FC, useState } from 'react';
import Calendar from 'react-calendar';
import { useMutation } from 'react-query';
import Spinner from '@/components/ui/Spinner';
import './style.css';

interface AvailabilityPeriodsProps {
  meetId: string;
  style?: any;
  onPeriodSelected: (date: string) => void;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const AvailabilityPeriods: FC<AvailabilityPeriodsProps> = ({ meetId, style, onPeriodSelected }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [date, setDate] = useState<Value>(new Date());
  const [availablePeriods, setAvailablePeriods] = useState<BookingPeriod[]>();
  const toast = useToast();

  const { mutate: bookingAvailabilityMutation, isLoading: isFindingAvailability } = useMutation(bookingAvailability);

  const handleDateChange = (date: any) => {
    setDate(date);
    const payload: BookingAvailability = {
      from: date[0].toISOString(),
      to: date[1].toISOString(),
      meetId,
    };
    bookingAvailabilityMutation(payload, {
      onSuccess: (data: any) => {
        setAvailablePeriods(data);
      },
      onError: (error: any) => {
        toast({
          title: 'Could find available spots',
          description: error.message,
          position: 'top',
          isClosable: true,
          status: 'info',
        });
      },
    });
  };

  const handlePeriodClick = (id: string, period: string) => {
    setSelectedPeriod(id);
    const date = availablePeriods?.find((period) => period.periods.find((item) => item.id == id));
    const fullDate = formatDateAndTime(date?.date as string, period.split('-')[0]);
    onPeriodSelected(fullDate);
  };

  return (
    <div style={{ width: '100%' }}>
      <Calendar minDate={new Date()} className="date-picker" selectRange view="month" onChange={handleDateChange} value={date} />
      <Spinner mt={5} loading={isFindingAvailability} />
      {availablePeriods?.map((period: BookingPeriod, index: number) => {
        return (
          <>
            {period.periods.length > 0 && (
              <div key={index}>
                <Text>{formatDate(period.date)}</Text>
                <SimpleGrid columns={[1, 2, 3]} gridTemplateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} spacing="10px">
                  {period.periods.map((item, index) => (
                    <Tag
                      style={{ height: '40px' }}
                      key={index}
                      value={item.value}
                      id={item.id}
                      active={item.id == selectedPeriod}
                      onTagClick={handlePeriodClick}
                    />
                  ))}
                </SimpleGrid>
              </div>
            )}
          </>
        );
      })}
      {availablePeriods?.length == 0 && (
        <Alert mt={5} status="warning">
          <AlertIcon />
          Could not find any available spots.
        </Alert>
      )}
    </div>
  );
};

export default AvailabilityPeriods;
