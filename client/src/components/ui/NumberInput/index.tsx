import {
  NumberInput as ChakraNumberInput,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { FC } from 'react';

type ChakraInputProps = React.ComponentProps<typeof ChakraNumberInput>;

interface AdditionalProps {
  label?: string;
  required?: boolean;
  props?: ChakraInputProps;
  register?: any;
  error?: any;
}

type InputProps = ChakraInputProps & AdditionalProps;

const NumberInput: FC<InputProps> = ({ label, required = false, register, error, props, ...rest }) => {
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraNumberInput register={register} {...props} {...rest}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default NumberInput;
