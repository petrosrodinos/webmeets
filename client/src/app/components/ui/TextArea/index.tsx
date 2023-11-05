import { FC } from 'react';
import { Textarea, TextareaProps as ChakraTextareaProps, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';

type TextAreaProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
} & ChakraTextareaProps;

const TextArea: FC<TextAreaProps> = ({ placeholder, error, required, label, ...rest }) => {
  return (
    <>
      <FormControl isInvalid={!!error} isRequired={required}>
        {label && <FormLabel>{label}</FormLabel>}
        <Textarea placeholder={placeholder} {...rest} />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default TextArea;
