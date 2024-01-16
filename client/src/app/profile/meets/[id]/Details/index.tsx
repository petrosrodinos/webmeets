import { FC, useState, useEffect } from 'react';
import { DeletePeriod, EditPeriod, Hours, Meet, AddPeriod, ClosingPeriod } from '@/interfaces/meet';
import { Tabs, TabList, TabPanels, Tab, TabPanel, useToast, Button } from '@chakra-ui/react';
import Step1 from '../../CreateMeet/Step1';
import Step2 from '../../CreateMeet/Step2';
import Step3 from '../../CreateMeet/Step3';
import { addPeriod, deletePeriod, editMeet, editPeriod } from '@/services/meets';
import { useMutation } from 'react-query';
import { MeetSchema } from '@/validation-schemas/meet';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import ClosingPeriods from './ClosingPeriods';
import Settings from './Settings';

interface DetailsProps {
  meet: Meet | undefined;
}

const Details: FC<DetailsProps> = ({ meet }) => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState(1);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const { mutate: editMeetMutation, isLoading } = useMutation((data: any) => {
    return editMeet(meet?.id as string, data);
  });

  const { mutate: addPeriodMutation, isLoading: isAddingPeriod } = useMutation((data: AddPeriod) => {
    return addPeriod(data);
  });

  const { mutate: editPeriodMutation, isLoading: isEditingPeriod } = useMutation((data: EditPeriod) => {
    return editPeriod(data);
  });

  const { mutate: deletePeriodMutation, isLoading: isDeletingPeriod } = useMutation((data: DeletePeriod) => {
    return deletePeriod(data);
  });

  const {
    register,
    trigger,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(MeetSchema),
  });

  useEffect(() => {
    reset({
      name: meet?.name || '',
      description: meet?.description || '',
      category: meet?.category || '',
      images: meet?.images || [],
      type: meet?.type || 'remote',
      duration: meet?.duration || 60,
      maxParticipants: meet?.maxParticipants || 5,
      price: meet?.price || 0,
      hours: meet?.hours || [],
      closingPeriods: meet?.closingPeriods || [],
    });
  }, [meet]);

  async function handleSave() {
    let fildsToValidate: any[] = [];
    if (activeTab === 1) {
      fildsToValidate = ['name', 'description', 'category'];
      await trigger(fildsToValidate);
    } else if (activeTab === 2) {
      fildsToValidate = ['duration', 'maxParticipants'];
      await trigger(fildsToValidate);
    }
    const isValid = fildsToValidate.every((field: any) => getValues(field));
    if (isValid) {
      saveValues(getValues());
    }
  }

  const saveValues = async (values: any) => {
    const newImages = values.images.filter((image: any) => !image.id);

    const payload = {
      ...values,
      newImages: newImages,
      imagesToDelete,
    };

    // return;

    editMeetMutation(payload, {
      onSuccess: () => {
        toast({
          title: 'Meet updated successfully',
          position: 'top',
          isClosable: true,
          status: 'success',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Something went wrong',
          description: error.message,
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      },
    });
  };

  const handleAddPeriod = (data: AddPeriod) => {
    addPeriodMutation(data, {
      onSuccess: (data: any) => {
        setValue('hours', data);
        toast({
          title: 'Period added successfully',
          position: 'top',
          isClosable: true,
          status: 'success',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Something went wrong',
          description: error.message,
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      },
    });
  };

  const hanleEditPeriod = (data: EditPeriod) => {
    editPeriodMutation(data, {
      onSuccess: (data: any) => {
        setValue('hours', data);

        toast({
          title: 'Period edited successfully',
          position: 'top',
          isClosable: true,
          status: 'success',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Something went wrong',
          description: error.message,
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      },
    });
  };

  const handleRemovePeriod = (data: DeletePeriod) => {
    deletePeriodMutation(data, {
      onSuccess: (data: any) => {
        setValue('hours', data);
        toast({
          title: 'Period deleted successfully',
          position: 'top',
          isClosable: true,
          status: 'success',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Something went wrong',
          description: error.message,
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      },
    });
  };

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  const handleImageDelete = (imageId: string) => {
    setImagesToDelete((prev) => [...prev, imageId]);
  };

  return (
    <Tabs onChange={handleTabChange} variant="soft-rounded" colorScheme="green">
      <TabList display="flex" flexDirection={{ base: 'column', md: 'row' }}>
        <Tab>Information</Tab>
        <Tab>Pricing</Tab>
        <Tab>Opening Hours</Tab>
        <Tab>Closing Periods</Tab>
        <Tab>Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Step1 values={getValues()} register={register} setValue={setValue} errors={errors} onImageDelete={handleImageDelete} />
        </TabPanel>
        <TabPanel>
          <Step2 register={register} setValue={setValue} errors={errors} />
        </TabPanel>
        <TabPanel>
          <Step3
            values={getValues('hours') as Hours[]}
            setValue={setValue}
            meetId={meet?.id}
            onAddPeriod={handleAddPeriod}
            onEditPeriod={hanleEditPeriod}
            onDeletePeriod={handleRemovePeriod}
            isAdding={isAddingPeriod}
            isEditing={isEditingPeriod}
            isDeleting={isDeletingPeriod}
          />
        </TabPanel>
        <TabPanel>
          <ClosingPeriods meetId={meet?.id} values={getValues('closingPeriods') as ClosingPeriod[]} />
        </TabPanel>
        <TabPanel>
          <Settings meetId={meet?.id} />
        </TabPanel>
      </TabPanels>
      {activeTab !== 3 && activeTab !== 2 && activeTab != 4 && (
        <Button
          isLoading={isLoading}
          loadingText="Saving"
          rightIcon={<FaCheck />}
          width={100}
          ml={4}
          onClick={handleSave}
          bg={'green.500'}
          color={'white'}
          _hover={{
            bg: 'green.600',
          }}
        >
          Save
        </Button>
      )}
    </Tabs>
  );
};

export default Details;
