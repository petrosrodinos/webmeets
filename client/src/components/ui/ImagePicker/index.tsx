import { useImperativeFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  // ImageDimensionsValidator,
} from 'use-file-picker/validators';
import { FC, useEffect, useState } from 'react';
import Spinner from '@/components/ui/Spinner';
import { Button, SimpleGrid, useColorModeValue, Box } from '@chakra-ui/react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { ImagePickerFile, ImagePickerItemData } from '@/interfaces/components';
import './style.css';

interface ImagePickerProps {
  label: string;
  maxFiles?: number;
  multiple?: boolean;
  accept?: string;
  name: string;
  images?: Image[];
  onChange: (data: ImagePickerItemData) => void;
  onImageDelete?: (data: string) => void;
}

interface Image {
  id: string;
  file: string;
}

const ImagePicker: FC<ImagePickerProps> = ({
  images,
  label,
  name,
  onChange,
  onImageDelete,
  multiple = true,
  accept = 'image/*',
  maxFiles = 5,
}) => {
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImagePickerFile[]>([]);

  useEffect(() => {
    if (images && images.length > 0 && filteredImages.length == 0) {
      setFilteredImages(images);
    }
  }, [images]);

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

  const { openFilePicker, filesContent, loading, plainFiles, errors, removeFileByIndex } = useImperativeFilePicker({
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
    onFilesSuccessfullySelected: ({ plainFiles }) => {
      const filesWithIds = plainFiles.map((file, index) => ({
        id: index.toString(),
        file: file,
      }));
      setSelectedImages((prev) => [...prev, ...filesWithIds]);

      onChange({
        name,
        files: filesWithIds,
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

  const removeImage = (index: number, imageId?: string) => {
    if (imageId) {
      setFilteredImages((prev) => prev.filter((image: Image) => image.id != imageId));
      onImageDelete?.(imageId);
    } else {
      removeFileByIndex(index);
      const newImages = selectedImages.filter((_, i) => i != index);
      setSelectedImages(newImages);

      onChange({
        name,
        files: newImages,
      });
    }
  };

  const ImageContainer = ({ image, index, imageId }: { image: string; index: number; imageId?: string }) => {
    return (
      <div className="image-container">
        <IoIosCloseCircleOutline className="image-remove-button" onClick={() => removeImage(index, imageId)} />
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
              <ImageContainer image={file.content} index={index} />
            ))}
          </SimpleGrid>
        )}
        {!!filteredImages?.length && (
          <SimpleGrid mt={2} columns={{ sm: 2, md: 3 }} spacing={2}>
            {filteredImages?.map((image, index) => (
              <ImageContainer imageId={image.id} image={image.file} index={index} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </div>
  );
};

export default ImagePicker;
