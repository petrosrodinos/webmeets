import { FC, useState, useEffect } from 'react';
import { Meet } from '@/interfaces/meet';
import { Tabs, TabList, TabPanels, Tab, TabPanel, useToast, Button } from '@chakra-ui/react';
import Step1 from '../../CreateMeet/Step1';
import Step2 from '../../CreateMeet/Step2';
import Step3 from '../../CreateMeet/Step3';
import { editMeet } from '@/services/meets';
import { useMutation } from 'react-query';
import { MeetSchema } from '@/validation-schemas/meet';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
interface DetailsProps {
  meet: Meet | undefined;
}

const Details: FC<DetailsProps> = ({ meet }) => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState(1);

  const { mutate: editMeetMutation, isLoading } = useMutation((data: any) => {
    return editMeet(meet?.id as string, data);
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

  function saveValues(values: any) {
    console.log(values);

    // return;

    const payload = {
      ...values,
    };

    editMeetMutation(payload, {
      onSuccess: (data: any) => {
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
  }

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList>
        <Tab>Information</Tab>
        <Tab>Participants/Price/Duration</Tab>
        <Tab>Opening Hours</Tab>
      </TabList>
      <TabPanels>
        <TabPanel onClick={() => handleTabClick(1)}>
          <Step1 register={register} setValue={setValue} errors={errors} />
        </TabPanel>
        <TabPanel onClick={() => handleTabClick(1)}>
          <Step2 register={register} setValue={setValue} errors={errors} />
        </TabPanel>
        <TabPanel onClick={() => handleTabClick(1)}>
          <Step3 setValue={setValue} />
        </TabPanel>
      </TabPanels>
      <Button
        isLoading={isLoading}
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
    </Tabs>
  );
};

export default Details;
