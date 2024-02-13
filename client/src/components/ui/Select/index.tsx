import { FormControl, FormErrorMessage, FormLabel, Select as ChakraSelect } from "@chakra-ui/react";
import { FC } from "react";
import { OptionItem } from "../../../interfaces/components";

type SelectProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  props?: any;
  register?: any;
  options: OptionItem[];
  onChange?: any;
} & React.ComponentProps<typeof ChakraSelect>;

const Select: FC<SelectProps> = ({
  placeholder,
  register,
  error,
  required,
  label,
  onChange,
  options = [],
  props,
  ...rest
}) => {
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraSelect
        onChange={onChange}
        placeholder={placeholder}
        {...register}
        {...props}
        {...rest}
      >
        {options?.map((option: OptionItem, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default Select;
