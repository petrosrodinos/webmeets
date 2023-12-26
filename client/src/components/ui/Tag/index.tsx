import { FC } from 'react';
import { Tag as ChakraTag, TagCloseButton, TagLabel } from '@chakra-ui/react';

type TagProps = {
  value: string;
  onClose?: (value: string) => void;
  props?: any;
} & React.ComponentProps<typeof ChakraTag>;

const Tag: FC<TagProps> = ({ value, onClose, props, ...rest }) => {
  const handleClose = () => {
    onClose?.(value);
  };
  return (
    <>
      <ChakraTag size="lg" borderRadius="full" variant="solid" colorScheme="green" {...props} {...rest}>
        <TagLabel>{value}</TagLabel>
        {onClose && <TagCloseButton onClick={handleClose} />}
      </ChakraTag>
    </>
  );
};

export default Tag;
