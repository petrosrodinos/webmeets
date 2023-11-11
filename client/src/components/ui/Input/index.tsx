import {
  Button,
  Input as ChakraInput,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

type ChakraInputProps = React.ComponentProps<typeof ChakraInput>;

interface AdditionalProps {
  label?: string;
  required?: boolean;
  isPassword?: boolean;
  props?: ChakraInputProps;
  register?: any;
  error?: any;
}

type InputProps = ChakraInputProps & AdditionalProps;

const Input: FC<InputProps> = ({ label, required = false, isPassword, register, error, props, ...rest }) => {
  const SelectedInput = isPassword ? PasswordInput : NormalInput;

  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      {label && <FormLabel>{label}</FormLabel>}
      {<SelectedInput register={register} {...props} {...rest} />}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

const NormalInput: FC<InputProps> = ({ props, register, ...rest }) => {
  return <ChakraInput {...props} {...register} {...rest} />;
};

const PasswordInput: FC<InputProps> = ({ props, register, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <ChakraInput type={showPassword ? 'text' : 'password'} {...register} {...props} {...rest} />
      <InputRightElement h={'full'}>
        <Button variant={'ghost'} onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default Input;
