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
  values?: Period;
  day: string;
}

const defaultPeriod: Period = {
  id: '',
  from: '',
  to: '',
};

const Period: FC<PeriodProps> = ({ onAdd, onRemove, onEdit, values, day }) => {
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
    onAdd?.(day, period);
    setPeriod(defaultPeriod);
  };

  const handleEdit = () => {
    onEdit?.(day, period);
  };

  const handleRemove = () => {
    onRemove?.(day, period.id);
  };

  return (
    <HStack mb={5}>
      <Input name="from" onChange={handleChange} value={period.from} label="From" type="time" />
      <Input name="to" onChange={handleChange} value={period.to} label="To" type="time" />
      {onAdd && (
        <IconButton onClick={handleAdd} colorScheme="green" aria-label="add-period" icon={<FaPlus />} alignSelf={'flex-end'} />
      )}
      {!onAdd && (
        <>
          <IconButton
            onClick={handleEdit}
            colorScheme="green"
            aria-label="edit-period"
            icon={<MdEdit />}
            alignSelf={'flex-end'}
          />
          <IconButton
            aria-label="remove-period"
            icon={<FaRegTrashAlt />}
            onClick={handleRemove}
            colorScheme="red"
            alignSelf={'flex-end'}
          />
        </>
      )}
    </HStack>
  );
};

export default Period;
