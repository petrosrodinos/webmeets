import Tag from '@/components/ui/Tag';
import { BookingPeriod } from '@/interfaces/booking';
import { formatDate, formatDateAndTime } from '@/lib/date';
import { SimpleGrid, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

interface AvailabilityPeriodsProps {
  periods: BookingPeriod[];
  onPeriodSelected: (date: string) => void;
}

const AvailabilityPeriods: FC<AvailabilityPeriodsProps> = ({ periods, onPeriodSelected }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const handlePeriodClick = (id: string, period: string) => {
    setSelectedPeriod(id);
    const date = periods.find((period) => period.periods.find((item) => item.id == id));
    const fullDate = formatDateAndTime(date?.date as string, period.split('-')[0]);
    onPeriodSelected(fullDate);
  };

  return (
    <div>
      {periods.map((period: BookingPeriod, index: number) => (
        <div>
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
      ))}
    </div>
  );
};

export default AvailabilityPeriods;
