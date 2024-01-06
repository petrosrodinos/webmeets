import { HStack, IconButton, useToast } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import Input from '@/components/ui/Input';
import { Period } from '@/interfaces/meet';
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';

interface PeriodProps {
  onRemove?: (day: string, id: string) => void;
  onEdit?: (day: string, period: Period) => void;
  onAdd?: (day: string, period: Period) => void;
  isAdding?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
  values?: Period;
  dayId: string;
}

const defaultPeriod: Period = {
  id: '',
  from: '',
  to: '',
};

const Period: FC<PeriodProps> = ({ onAdd, onRemove, onEdit, values, dayId, isAdding, isEditing, isDeleting }) => {
  const toast = useToast();

  const [period, setPeriod] = useState<Period>(values || defaultPeriod);

  useEffect(() => {
    setPeriod(values || defaultPeriod);
  }, [values]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPeriod((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!period.from || !period.to) {
      return toast({
        title: 'Please fill in the period fields',
        position: 'top',
        isClosable: true,
        status: 'warning',
      });
    }
    onAdd?.(dayId, period);
    setPeriod(defaultPeriod);
  };

  const handleEdit = () => {
    onEdit?.(dayId, period);
  };

  const handleRemove = () => {
    onRemove?.(dayId, period.id);
  };

  return (
    <HStack mb={5}>
      <Input name="from" onChange={handleChange} value={period.from} label="From" type="time" />
      <Input name="to" onChange={handleChange} value={period.to} label="To" type="time" />
      {onAdd && (
        <IconButton
          onClick={handleAdd}
          isLoading={isAdding}
          colorScheme="green"
          aria-label="add-period"
          icon={<FaPlus />}
          alignSelf={'flex-end'}
        />
      )}
      {!onAdd && (
        <>
          <IconButton
            onClick={handleEdit}
            colorScheme="green"
            aria-label="edit-period"
            icon={<MdEdit />}
            alignSelf={'flex-end'}
            isLoading={isEditing}
          />
          <IconButton
            aria-label="remove-period"
            icon={<FaRegTrashAlt />}
            onClick={handleRemove}
            colorScheme="red"
            alignSelf={'flex-end'}
            isLoading={isDeleting}
          />
        </>
      )}
    </HStack>
  );
};

export default Period;
