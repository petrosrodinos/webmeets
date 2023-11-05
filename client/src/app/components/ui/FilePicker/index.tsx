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
  previewType?: 'avatar' | 'banner';
  onChange?: ({ name, file }: { name: string; file: File }) => void;
}

const FileUpload: FC<FileUploadProps> = ({
  onChange,
  placeholder,
  name,
  acceptedFileTypes,
  error,
  label,
  isRequired = false,
  previewType = 'avatar',
}) => {
  const inputRef: any = useRef();
  const [imagePreview, setImagePreview] = useState<any>(null);

  const handleChange = (e: any) => {
    const file: File = e.target.files[0];
    if (!file) {
      return;
    }
    onChange?.({
      name,
      file,
    });
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
          {previewType === 'avatar' ? (
            <Avatar onClick={openFilePicker} size="lg" name="Selected image" src={imagePreview} />
          ) : (
            <img onClick={openFilePicker} src={imagePreview} alt="Selected image" />
          )}
        </Center>
      )}
    </FormControl>
  );
};

export default FileUpload;
