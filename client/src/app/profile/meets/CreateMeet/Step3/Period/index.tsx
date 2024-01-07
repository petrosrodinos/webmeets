import { HStack, IconButton, useToast, Text } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import Input from '@/components/ui/Input';
import { Period } from '@/interfaces/meet';
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';

interface PeriodProps {
  onRemove?: (dayId: string, id: string) => void;
  onEdit?: (dayId: string, period: Period) => void;
  onAdd?: (dayId: string, period: Period) => void;
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
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

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
    <>
      <Modal
        title="Do you want to delete this period?"
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onAction={handleRemove}
        actionTitle="Delete"
        closeTitle="Cancel"
      >
        <Text h={10}>This action cannot be undone!</Text>
      </Modal>
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
              onClick={() => setDeleteModal(true)}
              colorScheme="red"
              alignSelf={'flex-end'}
              isLoading={isDeleting}
            />
          </>
        )}
      </HStack>
    </>
  );
};

export default Period;
