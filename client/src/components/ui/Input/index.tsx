import {
  Button,
  Input as ChakraInput,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaRegEyeSlash } from 'react-icons/fa';
type ChakraInputProps = React.ComponentProps<typeof ChakraInput>;

interface AdditionalProps {
  label?: string;
  required?: boolean;
  password?: boolean;
  props?: ChakraInputProps;
  register?: any;
  error?: any;
  icon?: any;
}

type InputProps = ChakraInputProps & AdditionalProps;

const Input: FC<InputProps> = ({ label, required = false, password, register, error, icon: Icon, props, ...rest }) => {
  const [showPassword, setShowPassword] = useState(password ? false : true);

  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {Icon && (
          <InputLeftElement pointerEvents="none">
            <Icon color="gray.300" />
          </InputLeftElement>
        )}
        <ChakraInput type={showPassword ? 'text' : 'password'} {...props} {...register} {...rest} />
        {password && (
          <InputRightElement h={'full'}>
            <Button variant={'ghost'} onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <AiFillEye /> : <FaRegEyeSlash />}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default Input;
