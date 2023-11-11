import { FC } from 'react';
import { Tag as ChakraTag, TagCloseButton, TagLabel } from '@chakra-ui/react';

type TagProps = {
  value: string;
  onClose?: (value: string) => void;
} & React.ComponentProps<typeof ChakraTag>;

const Tag: FC<TagProps> = ({ value, onClose, ...rest }) => {
  const handleClose = () => {
    onClose?.(value);
  };
  return (
    <>
      <ChakraTag size="lg" borderRadius="full" variant="solid" colorScheme="green" {...rest}>
        <TagLabel>{value}</TagLabel>
        {onClose && <TagCloseButton onClick={handleClose} />}
      </ChakraTag>
    </>
  );
};

export default Tag;
