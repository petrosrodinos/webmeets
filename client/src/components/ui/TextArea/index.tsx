import { FC } from 'react';
import { Textarea, TextareaProps as ChakraTextareaProps, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';

type TextAreaProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  props?: ChakraTextareaProps;
  register?: any;
} & ChakraTextareaProps;

const TextArea: FC<TextAreaProps> = ({ placeholder, register, error, required, label, props, ...rest }) => {
  return (
    <>
      <FormControl isInvalid={!!error} isRequired={required}>
        {label && <FormLabel>{label}</FormLabel>}
        <Textarea {...register} placeholder={placeholder} {...props} {...rest} />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default TextArea;
