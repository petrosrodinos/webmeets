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
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
  acceptedFileTypes = 'image/*, .pdf, .doc, .docx',
  error,
  label,
  isRequired = false,
  previewType = 'avatar',
}) => {
  const inputRef: any = useRef();
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

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

    let url = URL.createObjectURL(file);
    setFileUrl(url);
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
        <div>
          <Document file={imagePreview} onLoadSuccess={onDocumentLoadSuccess}>
            <Page renderAnnotationLayer={false} width={300} pageNumber={3} />
          </Document>
        </div>
      )}

      {/* {imagePreview && (
        <Center style={{ cursor: 'pointer' }}>
          {previewType === 'avatar' ? (
            <Avatar onClick={openFilePicker} size="lg" name="Selected image" src={imagePreview} />
          ) : (
            <img onClick={openFilePicker} src={imagePreview} alt="Selected image" />
          )}
        </Center>
      )} */}
    </FormControl>
  );
};

export default FileUpload;
