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
import { useRef, FC, useState } from 'react';
import DocumentPreview from './DocumentPreview';

interface FileUploadProps {
  name: string;
  placeholder?: string;
  accept?: 'image/*' | '.pdf' | '.doc' | '.docx';
  label?: any;
  isRequired?: boolean;
  error?: string;
  previewType?: 'avatar' | 'banner' | 'pdf';
  onChange: ({ name, file }: { name: string; file: File }) => void;
}

const FileUpload: FC<FileUploadProps> = ({
  onChange,
  placeholder = 'Select a file ...',
  name,
  accept = 'image/*, .pdf, .doc, .docx',
  error,
  label,
  isRequired = false,
  previewType = 'avatar',
}) => {
  const inputRef: any = useRef();
  const [filePreview, setFilePreview] = useState<any>(null);
  const [fileName, setFileName] = useState<string>('');

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
      setFilePreview(reader.result);
      //set name
      setFileName(file.name);
    };

    // let url = URL.createObjectURL(file);
    // setFileUrl(url);
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
