import { useImperativeFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from 'use-file-picker/validators';
import { FC, useEffect } from 'react';
import Spinner from '@/components/ui/Spinner';
import { Button, SimpleGrid, useColorModeValue, Box } from '@chakra-ui/react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import './style.css';

interface ImagePickerProps {
  label: string;
  maxFiles?: number;
  multiple?: boolean;
  accept?: string;
  onChange: (files: any) => void;
}

const ImagePicker: FC<ImagePickerProps> = ({ label, onChange, multiple = true, accept = 'image/*', maxFiles = 5 }) => {
  const FilePickerButton = ({ label }: { label: string }) => {
    return (
      <Button onClick={() => openFilePicker()} leftIcon={<MdOutlineAddPhotoAlternate />} colorScheme="pink" variant="solid">
        {label}
      </Button>
    );
  };

  const { openFilePicker, filesContent, loading, errors, removeFileByIndex } = useImperativeFilePicker({
    readAs: 'DataURL',
    accept: accept,
    multiple: multiple,
    validators: [
      new FileAmountLimitValidator({ max: maxFiles }),
      new FileTypeValidator(['jpg', 'png', 'jpeg']),
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
      //   new ImageDimensionsValidator({
      //     maxHeight: 900,
      //     maxWidth: 1600,
      //     minHeight: 600,
      //     minWidth: 768,
      //   }),
    ],
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  if (errors.length) {
    return (
      <div>
        <FilePickerButton label="Something went wrong,retry" />

        {errors.map((err: any) => (
          <div>
            {err.name}: {err.reason}{' '}
            {err?.reasons?.map((reason: string) => (
              <p>{reason}</p>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (loading) {
    return <Spinner loading={true} />;
  }

  return (
    <div>
      <FilePickerButton label={label} />
      <br />
      <Box rounded={'sm'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'sm'} p={1}>
        <SimpleGrid mt={10} columns={{ sm: 2, md: 3 }} spacing={2}>
          {filesContent.map((file, index) => (
            <div className="image-container">
              <IoIosCloseCircleOutline className="image-remove-button" onClick={() => removeFileByIndex(index)} />
              <img className="image-picker-image" key={index} alt={file.name} src={file.content}></img>
            </div>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default ImagePicker;
