import { Button, HStack, VStack } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import Input from "components/ui/Input";
import {
  AddClosingPeriod,
  ClosingPeriod,
  DeleteClosingPeriod,
  EditClosingPeriod,
} from "interfaces/meet";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { ClosingPeriodSchema } from "validation-schemas/meet";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import TextArea from "components/ui/TextArea";

interface PeriodProps {
  onRemove?: (value: DeleteClosingPeriod) => void;
  onEdit?: (value: EditClosingPeriod) => void;
  onAdd?: (period: AddClosingPeriod) => void;
  id?: string;
  values?: ClosingPeriod;
  meetId: string;
  isAdding?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
}

const Period: FC<PeriodProps> = ({
  onAdd,
  onRemove,
  onEdit,
  values,
  id,
  meetId,
  isAdding,
  isEditing,
  isDeleting,
}) => {
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
        description: values?.description || "",
        from: values.from,
        to: values.to,
      });
    }
  }, [values]);

  const handleAdd = (data: any) => {
    onAdd?.({
      ...data,
      meetId: meetId,
    });
    reset();
  };

  const handleEdit = () => {
    const period: EditClosingPeriod = {
      ...getValues(),
      meetId: meetId as string,
      closingPeriodId: id as string,
    };
    onEdit?.(period);
  };

  const handleRemove = () => {
    onRemove?.({
      meetId: meetId as string,
      closingPeriodId: id as string,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleAdd)}>
      <VStack>
        <Input
          error={errors.name?.message}
          register={register("name")}
          placeholder="Enter period name"
          label="Name"
          type="text"
        />
        <HStack width="100%" alignSelf="flex-start">
          <Input
            error={errors.from?.message}
            register={register("from")}
            label="From"
            type="datetime-local"
          />
          <Input
            error={errors.to?.message}
            register={register("to")}
            label="To"
            type="datetime-local"
          />
        </HStack>
        <TextArea
          error={errors.description?.message}
          label="Description (optional)"
          register={register("description")}
          placeholder="Why are you taking time off?"
        />
        {onAdd && (
          <Button
            type="submit"
            isLoading={isAdding}
            colorScheme="green"
            aria-label="add-period"
            leftIcon={<FaPlus />}
            alignSelf={"flex-start"}
          >
            Add
          </Button>
        )}
        {!onAdd && (
          <HStack alignSelf="flex-start">
            <Button
              onClick={handleEdit}
              colorScheme="green"
              aria-label="edit-period"
              leftIcon={<MdEdit />}
              isLoading={isEditing}
            >
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
