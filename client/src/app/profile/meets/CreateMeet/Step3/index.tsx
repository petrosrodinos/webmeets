import { AddPeriod, DeletePeriod, EditPeriod, Hours, Period } from '@/interfaces/meet';
import { Box } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import PeriodInput from './Period';
interface Step3Props {
  setValue?: any;
  values?: Hours[];
  meetId?: string;
  isAdding?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
  onAddPeriod?: (data: AddPeriod) => void;
  onEditPeriod?: (data: EditPeriod) => void;
  onDeletePeriod?: (data: DeletePeriod) => void;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const emptyHours: Hours[] = days.map((day) => ({
  id: uuid(),
  day,
  periods: [],
}));

const Step3: FC<Step3Props> = ({
  setValue,
  values,
  meetId,
  isAdding,
  isEditing,
  isDeleting,
  onAddPeriod,
  onEditPeriod,
  onDeletePeriod,
}) => {
  const [hours, setHours] = useState<Hours[]>(emptyHours);
  const [addingId, setAddingId] = useState<string>();
  const [editingId, setEditingId] = useState<string>();
  const [deletingId, setDeletingId] = useState<string>();

  useEffect(() => {
    if (values && values.length > 0) {
      setHours(values);
    }
  }, [values]);

  const handleAddPeriod = (dayId: string, period: Period) => {
    const periodToAdd = {
      ...period,
      id: uuid(),
    };
    const updatedHours = hours.map((hour) => {
      if (hour.id === dayId) {
        return {
          ...hour,
          periods: [...hour.periods, periodToAdd],
        };
      }
      return hour;
    });
    setHours(updatedHours);
    setValue('hours', updatedHours);

    if (values) {
      setAddingId(dayId);
      onAddPeriod?.({ meetId: meetId as string, hourId: dayId, from: periodToAdd.from, to: periodToAdd.to });
    }
  };

  const hanleEditPeriod = (dayId: string, period: Period) => {
    const updatedHours = hours.map((hour) => {
      if (hour.id === dayId) {
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
    setValue('hours', updatedHours);
    if (values) {
      setEditingId(period.id);
      onEditPeriod?.({ meetId: meetId as string, hourId: dayId, periodId: period.id, from: period.from, to: period.to });
    }
  };

  const handleRemovePeriod = (dayId: string, id: string) => {
    const updatedHours = hours.map((hour) => {
      if (hour.id === dayId) {
        return {
          ...hour,
          periods: hour.periods.filter((period) => period.id !== id),
        };
      }
      return hour;
    });
    setHours(updatedHours);
    setValue('hours', updatedHours);
    if (values) {
      setDeletingId(id);
      onDeletePeriod?.({ meetId: meetId as string, hourId: dayId, periodId: id });
    }
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
                <PeriodInput
                  key={index}
                  dayId={hour.id}
                  values={period}
                  onEdit={hanleEditPeriod}
                  onRemove={handleRemovePeriod}
                  isAdding={isAdding && addingId === period.id}
                  isEditing={isEditing && editingId === period.id}
                  isDeleting={isDeleting && deletingId === period.id}
                />
              ))}
              <PeriodInput
                dayId={hour.id}
                onAdd={handleAddPeriod}
                isAdding={isAdding && addingId === hour.id}
                isEditing={isEditing && editingId === hour.id}
                isDeleting={isDeleting && deletingId === hour.id}
              />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Step3;
