'use client';

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
import { useRef, FC, useState, useEffect } from 'react';
import DocumentPreview from './DocumentPreview';
import { FilePicker, FilePickerAccept, PreviewType } from '@/interfaces/components';

interface FileUploadProps {
  name: string;
  placeholder?: string;
  value?: File;
  accept?: FilePickerAccept;
  label?: any;
  isRequired?: boolean;
  error?: string;
  previewType?: PreviewType;
  onChange: ({ name, file }: FilePicker) => void;
}

const FileUpload: FC<FileUploadProps> = ({
  onChange,
  placeholder = 'Select a file ...',
  name,
  accept = 'image/*, .pdf, .doc, .docx',
  value,
  error,
  label,
  isRequired = false,
  previewType = 'avatar',
}) => {
  const inputRef: any = useRef();
  const [filePreview, setFilePreview] = useState<any>(null);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    if (value) {
      setFilePreview(value);
    }
  }, [value]);

  const handleChange = (e: any) => {
    const file: File = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePreview(reader.result);
      setFileName(file.name);
      onChange?.({
        name,
        file,
      });
    };
  };

  const openFilePicker = () => {
    inputRef?.current?.click?.();
  };

  const previewTypes = {
    avatar: <Avatar style={{ cursor: 'pointer' }} size="lg" name="Selected image" src={filePreview} />,
    banner: <img style={{ cursor: 'pointer' }} src={filePreview} alt="Selected image" />,
    pdf: <DocumentPreview imagePreview={filePreview} />,
  };

  return (
    <FormControl isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<Icon as={FiFile} />} />
        <input onChange={handleChange} type="file" accept={accept} ref={inputRef} style={{ display: 'none' }}></input>
        <Input defaultValue={fileName} placeholder={placeholder} onClick={openFilePicker} />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
      <br />

      {filePreview && <Center>{previewTypes[previewType]}</Center>}
    </FormControl>
  );
};

export default FileUpload;
