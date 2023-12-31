import { Hours, Period } from '@/interfaces/meet';
import { Box } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import PeriodInput from './Period';
interface Step3Props {
  register: any;
  errors: any;
  setValue: any;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const emptyHours: Hours[] = days.map((day) => ({
  id: uuid(),
  day,
  periods: [],
}));

const Step3: FC<Step3Props> = ({ register, errors, setValue }) => {
  const [hours, setHours] = useState<Hours[]>(emptyHours);

  useEffect(() => {
    console.log(hours);
  }, [hours]);

  const handleAddPeriod = (day: string, period: Period) => {
    const periodToAdd = {
      ...period,
      id: uuid(),
    };
    const updatedHours = hours.map((hour) => {
      if (hour.day === day) {
        return {
          ...hour,
          periods: [...hour.periods, periodToAdd],
        };
      }
      return hour;
    });
    setHours(updatedHours);
  };

  const hanleEditPeriod = (day: string, period: Period) => {
    const updatedHours = hours.map((hour) => {
      if (hour.day === day) {
        return {
          ...hour,
          periods: hour.periods.map((p) => {
            if (p.id === period.id) {
              return period;
            }
            return p;
          }),
        };
      }
      return hour;
    });

    setHours(updatedHours);
  };

  const handleRemovePeriod = (day: string, id: string) => {
    const updatedHours = hours.map((hour) => {
      if (hour.day === day) {
        return {
          ...hour,
          periods: hour.periods.filter((period) => period.id !== id),
        };
      }
      return hour;
    });
    setHours(updatedHours);
  };

  return (
    <div>
      <Accordion defaultIndex={[0]} allowMultiple>
        {hours.map((hour: Hours, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton borderRadius="10px" _expanded={{ bg: 'primary.500', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  {hour.day}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {hour.periods.map((period, index) => (
                <PeriodInput key={index} day={hour.day} values={period} onEdit={hanleEditPeriod} onRemove={handleRemovePeriod} />
              ))}
              <PeriodInput day={hour.day} onAdd={handleAddPeriod} />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Step3;
