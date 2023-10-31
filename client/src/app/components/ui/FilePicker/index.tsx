import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Icon,
  Avatar,
  Center,
} from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';
import { useRef, FC, useState } from 'react';

interface FileUploadProps {
  name: string;
  placeholder?: string;
  acceptedFileTypes?: string;
  label?: any;
  isRequired?: boolean;
  error?: string;
  onChange?: any;
}

const FileUpload: FC<FileUploadProps> = ({ onChange, placeholder, acceptedFileTypes, error, label, isRequired = false }) => {
  const inputRef: any = useRef();
  const [imagePreview, setImagePreview] = useState<any>(null);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    onChange(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const openFilePicker = () => {
    inputRef?.current?.click?.();
  };

  return (
    <FormControl isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<Icon as={FiFile} />} />
        <input onChange={handleChange} type="file" accept={acceptedFileTypes} ref={inputRef} style={{ display: 'none' }}></input>
        <Input placeholder={placeholder || 'Select a file ...'} onClick={openFilePicker} />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
      <br />
      {imagePreview && (
        <Center>
          <Avatar onClick={openFilePicker} size="lg" name="Selected avatar" src={imagePreview} />
        </Center>
      )}
    </FormControl>
  );
};

export default FileUpload;
