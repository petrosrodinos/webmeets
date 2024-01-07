import { AddClosingPeriod, ClosingPeriod, DeleteClosingPeriod, EditClosingPeriod } from '@/interfaces/meet';
import { Box, useToast } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import PeriodInput from './Period';
import { useMutation } from 'react-query';
import { addClosingPeriod, editClosingPeriod, deleteClosingPeriod } from '@/services/meets';
interface Step3Props {
  values: ClosingPeriod[];
  meetId?: string;
}

const ClosingPeriods: FC<Step3Props> = ({ values, meetId }) => {
  const [periods, setPeriods] = useState<ClosingPeriod[]>([]);
  const [periodEditing, setPeriodEditing] = useState<string>();
  const [periodDeleting, setPeriodDeleting] = useState<string>();
  const toast = useToast();

  const { mutate: addPeriodMutation, isLoading: isAddingPeriod } = useMutation((data: AddClosingPeriod) => {
    return addClosingPeriod(data);
  });

  const { mutate: editPeriodMutation, isLoading: isEditingPeriod } = useMutation((data: EditClosingPeriod) => {
    return editClosingPeriod(data);
  });

  const { mutate: deletePeriodMutation, isLoading: isDeletingPeriod } = useMutation((data: DeleteClosingPeriod) => {
    return deleteClosingPeriod(data);
  });

  useEffect(() => {
    if (values && values.length > 0) {
      setPeriods(values);
    }
  }, [values]);

  const handleAddPeriod = (period: AddClosingPeriod) => {
    addPeriodMutation(period, {
      onSuccess: (data) => {
        setPeriods(data);
        toast({
          title: 'Success',
          description: 'Period added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      },
    });
  };

  const hanleEditPeriod = (period: EditClosingPeriod) => {
    setPeriodEditing(period.closingPeriodId);
    editPeriodMutation(period, {
      onSuccess: (data) => {
        setPeriods(data);
        toast({
          title: 'Success',
          description: 'Period edited successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      },
    });
  };

  const handleRemovePeriod = async (period: DeleteClosingPeriod) => {
    setPeriodDeleting(period.closingPeriodId);
    deletePeriodMutation(period, {
      onSuccess: (data) => {
        setPeriods(data);
        toast({
          title: 'Success',
          description: 'Period deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      },
    });
  };

  return (
    <div>
      <PeriodInput meetId={meetId as string} onAdd={handleAddPeriod} isAdding={isAddingPeriod} />
      {periods.length > 0 && (
        <Accordion mt={5} allowMultiple>
          {periods.map((period: ClosingPeriod, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton borderRadius="10px" _expanded={{ bg: 'primary.500', color: 'white' }}>
                  <Box as="span" flex="1" textAlign="left">
                    {period.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <PeriodInput
                  meetId={meetId as string}
                  id={period.id}
                  values={period}
                  onEdit={hanleEditPeriod}
                  onRemove={handleRemovePeriod}
                  isEditing={isEditingPeriod && periodEditing === period.id}
                  isDeleting={isDeletingPeriod && periodDeleting === period.id}
                />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default ClosingPeriods;
