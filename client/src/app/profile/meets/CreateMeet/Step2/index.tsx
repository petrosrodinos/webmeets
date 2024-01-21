import { FC } from 'react';
import { Stack } from '@chakra-ui/react';
import NumberInput from '@/components/ui/NumberInput';
import Input from '@/components/ui/Input';

interface Step2Props {
  register: any;
  errors: any;
  setValue: any;
}

const Step2: FC<Step2Props> = ({ register, errors }) => {
  return (
    <Stack>
      <NumberInput min={1} label="Duration (minutes)" error={errors.duration?.message} register={register('duration')} />
      <NumberInput
        min={1}
        label="Max Participants"
        error={errors.maxParticipants?.message}
        register={register('maxParticipants')}
      />
      <NumberInput min={0} label="Price" error={errors.price?.message} register={register('price')} />
    </Stack>
  );
};

export default Step2;
