import { Button, HStack, VStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import Input from '@/components/ui/Input';
import { ClosingPeriod } from '@/interfaces/meet';
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { ClosingPeriodSchema } from '@/validation-schemas/meet';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import TextArea from '@/components/ui/TextArea';

interface PeriodProps {
  onRemove?: (id: string) => void;
  onEdit?: (id: string, period: ClosingPeriod) => void;
  onAdd?: (period: ClosingPeriod) => void;
  id?: string;
  values?: ClosingPeriod;
  isAdding?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
}

const Period: FC<PeriodProps> = ({ onAdd, onRemove, onEdit, values, id, isAdding, isEditing, isDeleting }) => {
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClosingPeriodSchema),
  });

  useEffect(() => {
    if (values) {
      reset({
        name: values.name,
        description: values?.description || '',
        from: values.from,
        to: values.to,
      });
    }
  }, [values]);

  const handleAdd = (data: any) => {
    onAdd?.({
      ...data,
      id: uuid(),
    });
    reset();
  };

  const handleEdit = () => {
    onEdit?.(id as string, getValues() as ClosingPeriod);
  };

  const handleRemove = () => {
    onRemove?.(id as string);
  };

  return (
    <form onSubmit={handleSubmit(handleAdd)}>
      <VStack>
        <Input
          error={errors.name?.message}
          register={register('name')}
          placeholder="Enter period name"
          label="Name"
          type="text"
        />
        <HStack width="100%" alignSelf="flex-start">
          <Input error={errors.from?.message} register={register('from')} label="From" type="datetime-local" />
          <Input error={errors.to?.message} register={register('to')} label="To" type="datetime-local" />
        </HStack>
        <TextArea
          error={errors.description?.message}
          label="Description (optional)"
          register={register('description')}
          placeholder="Why are you taking time off?"
        />
        {onAdd && (
          <Button
            type="submit"
            isLoading={isAdding}
            colorScheme="green"
            aria-label="add-period"
            leftIcon={<FaPlus />}
            alignSelf={'flex-start'}
          >
            Add
          </Button>
        )}
        {!onAdd && (
          <HStack alignSelf="flex-start">
            <Button onClick={handleEdit} colorScheme="green" aria-label="edit-period" leftIcon={<MdEdit />} isLoading={isEditing}>
              Edit
            </Button>
            <Button
              aria-label="remove-period"
              leftIcon={<FaRegTrashAlt />}
              onClick={handleRemove}
              colorScheme="red"
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </HStack>
        )}
      </VStack>
    </form>
  );
};

export default Period;
