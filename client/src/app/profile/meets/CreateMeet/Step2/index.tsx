import { FC } from 'react';
import { Stack, Button } from '@chakra-ui/react';
import NumberInput from '@/components/ui/NumberInput';

interface Step2Props {
  register: any;
  errors: any;
  setValue: any;
  onNext: any;
}

const Step2: FC<Step2Props> = ({ register, errors, setValue, onNext }) => {
  return (
    <Stack>
      <NumberInput
        min={1}
        defaultValue={60}
        label="Duration (minutes)"
        error={errors.duration?.message}
        register={register('duration')}
      />
      <NumberInput
        min={1}
        defaultValue={1}
        label="Max Participants"
        error={errors.maxParticipants?.message}
        register={register('maxParticipants')}
      />
      <NumberInput min={0} defaultValue={5} label="Price" error={errors.price?.message} register={register('price')} />

      {/* <Button
                  isLoading={isLoading}
                  type="submit"
                  loadingText={meet ? 'Updating' : 'Creating'}
                  size="lg"
                  bg={'primary.500'}
                  color={'white'}
                  _hover={{
                    bg: 'primary.600',
                  }}
                >
                  {meet ? 'Update' : 'Create'}
                </Button> */}
    </Stack>
  );
};

export default Step2;
