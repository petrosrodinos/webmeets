import { FC } from 'react';
import { Tag as ChakraTag, TagCloseButton, TagLabel } from '@chakra-ui/react';

type TagProps = {
  value: string;
  active?: boolean;
  id?: string;
  onClose?: (value: string) => void;
  onTagClick?: (id: string, value: string) => void;
  props?: any;
} & React.ComponentProps<typeof ChakraTag>;

const Tag: FC<TagProps> = ({ value, onClose, onTagClick, active = false, id, props, ...rest }) => {
  const handleClose = () => {
    onClose?.(value);
  };

  const handleTagClick = () => {
    onTagClick?.(id ? id : value, value);
  };
  return (
    <>
      <ChakraTag
        style={{
          backgroundColor: active ? '#ea4896' : '',
          cursor: !!handleTagClick ? 'pointer' : 'default',
          color: active ? 'white' : '',
        }}
        _hover={!!handleTagClick ? { backgroundColor: '#ea4896', color: 'white' } : {}}
        onClick={handleTagClick}
        size="lg"
        borderRadius="full"
        variant={!!onTagClick ? 'outline' : 'solid'}
        colorScheme="primary"
        {...props}
        {...rest}
      >
        <TagLabel>{value}</TagLabel>
        {onClose && <TagCloseButton onClick={handleClose} />}
      </ChakraTag>
    </>
  );
};

export default Tag;
