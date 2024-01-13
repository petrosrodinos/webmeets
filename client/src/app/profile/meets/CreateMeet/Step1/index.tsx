import { FC, useState, useEffect } from 'react';
import { Stack, VStack, RadioGroup, Radio, FormLabel, useColorModeValue } from '@chakra-ui/react';
import Input from '@/components/ui/Input';
import ImagePicker from '@/components/ui/ImagePicker';
import { ImagePickerItemData } from '@/interfaces/components';
import { MeetType } from '@/interfaces/meet';
import TextArea from '@/components/ui/TextArea';
import { SERVICE_CATEGORIES } from '@/constants/optionsData';
import Select from '@/components/ui/Select';

interface Step1Props {
  register: any;
  errors: any;
  setValue: any;
  values?: any;
  onImageDelete?: (data: string) => void;
}

const Step1: FC<Step1Props> = ({ register, errors, setValue, values, onImageDelete }) => {
  const [type, setType] = useState<MeetType>('remote');

  useEffect(() => {
    setType(values?.type || 'remote');
  }, [values]);

  const handleChange = (value: any) => {
    setType(value);
    setValue('type', value);
  };

  const handleImageChange = (data: ImagePickerItemData) => {
    const filesToStore = data.files.map((image: any) => image.file);
    setValue('images', filesToStore);
  };

  return (
    <Stack>
      <Input placeholder="Enter meet name" label="Name" error={errors.name?.message} register={register('name')} />

      <TextArea
        error={errors.description?.message}
        label="Description"
        register={register('description')}
        placeholder="What is your meet about?"
      />
      <Select
        error={errors.category?.message}
        placeholder="Select Category"
        options={SERVICE_CATEGORIES}
        label="Category"
        register={register('category')}
      />
      <FormLabel>Select Images</FormLabel>

      <ImagePicker
        images={values?.images}
        name="images"
        label="Select images"
        onChange={handleImageChange}
        onImageDelete={onImageDelete}
      />

      <FormLabel>Location</FormLabel>
      <RadioGroup colorScheme={useColorModeValue('primary', 'primary')} onChange={handleChange} value={type}>
        <Stack direction="row">
          <Radio size="lg" value="remote">
            Remote
          </Radio>
          <Radio size="lg" value="in-person">
            In Person
          </Radio>
          <Radio size="lg" value="clients-location">
            Client's Location
          </Radio>
        </Stack>
      </RadioGroup>

      {type == 'remote' && (
        <VStack>
          <Input label="Url" error={errors.phone?.message} register={register('phone')} />
        </VStack>
      )}

      {type == 'in-person' && (
        <Stack>
          <Input label="Phone Number" placeholder="Enter Phone" error={errors.phone?.message} register={register('phone')} />
          <Input label="City" placeholder="Enter City" error={errors.city?.message} register={register('city')} />
          <Input label="Area" placeholder="Enter Area" error={errors.area?.message} register={register('area')} />

          <Input label="Address" placeholder="Enter Address" error={errors.address?.message} register={register('address')} />

          <Input
            label="Postal Code"
            placeholder="Enter Postal Code"
            error={errors.postalCode?.message}
            register={register('postalCode')}
          />
        </Stack>
      )}

      {type == 'clients-location' && (
        <VStack>
          <Input label="Max visited area" error={errors.phone?.message} register={register('phone')} />
        </VStack>
      )}
    </Stack>
  );
};

export default Step1;
