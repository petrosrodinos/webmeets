import { useImperativeFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  // ImageDimensionsValidator,
} from 'use-file-picker/validators';
import { FC, useEffect } from 'react';
import Spinner from '@/components/ui/Spinner';
import { Button, SimpleGrid, useColorModeValue, Box } from '@chakra-ui/react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { ImagePickerItemData } from '@/interfaces/components';
import './style.css';

interface ImagePickerProps {
  label: string;
  maxFiles?: number;
  multiple?: boolean;
  accept?: string;
  name: string;
  images: { id: string; file: string }[];
  onChange: (data: ImagePickerItemData) => void;
}

const ImagePicker: FC<ImagePickerProps> = ({
  images,
  label,
  name,
  onChange,
  multiple = true,
  accept = 'image/*',
  maxFiles = 5,
}) => {
  const FilePickerButton = ({ label }: { label: string }) => {
    return (
      <Button
        onClick={() => openFilePicker()}
        leftIcon={<MdOutlineAddPhotoAlternate />}
        bg={'primary.500'}
        color={'white'}
        _hover={{
          bg: 'primary.600',
        }}
      >
        {label}
      </Button>
    );
  };

  useEffect(() => {
    console.log('asd', images);
  }, [images]);

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
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      onChange({
        name,
        files: plainFiles,
      });
    },
  });

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

  const Image = ({ image, index }: { image: string; index: number }) => {
    return (
      <div className="image-container">
        <IoIosCloseCircleOutline className="image-remove-button" onClick={() => removeFileByIndex(index)} />
        <img className="image-picker-image" alt={'image'} src={image}></img>
      </div>
    );
  };

  return (
    <div>
      <FilePickerButton label={label} />
      <Box rounded={'sm'} boxShadow={'sm'} p={1}>
        {filesContent.length > 0 && (
          <SimpleGrid mt={2} columns={{ sm: 2, md: 3 }} spacing={2}>
            {filesContent.map((file, index) => (
              <Image image={file.content} index={index} />
            ))}
          </SimpleGrid>
        )}
        {!!images?.length && (
          <SimpleGrid mt={2} columns={{ sm: 2, md: 3 }} spacing={2}>
            {images?.map((image, index) => (
              <Image image={image.file} index={index} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </div>
  );
};

export default ImagePicker;
