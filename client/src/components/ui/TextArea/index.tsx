import { FC } from 'react';
import { Textarea, TextareaProps as ChakraTextareaProps, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';

type TextAreaProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  props?: ChakraTextareaProps;
  register?: any;
  disabled?: boolean;
  onChange?: (e: any) => void;
} & ChakraTextareaProps;

const TextArea: FC<TextAreaProps> = ({ placeholder, disabled, register, error, required, label, onChange, props, ...rest }) => {
  return (
    <>
      <FormControl isInvalid={!!error} isRequired={required}>
        {label && <FormLabel>{label}</FormLabel>}
        <Textarea onChange={onChange} disabled={disabled} {...register} placeholder={placeholder} {...props} {...rest} />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default TextArea;
