import { FC, useState } from 'react';
import { FormControl, FormLabel, HStack, SimpleGrid } from '@chakra-ui/react';
import Tag from '../Tag';

interface TagSelectorProps {
  name: string;
  items: string[];
  label?: string;
  onChange: (name: string, items: string[]) => void;
}

const TagSelector: FC<TagSelectorProps> = ({ name, items, onChange, label }) => {
  const [tags, setTags] = useState<string[]>(items);

  const handleClose = (item: string) => {
    setTags(tags.filter((i) => i !== item));
    onChange(
      name,
      tags.filter((i) => i !== item),
    );
  };

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <SimpleGrid columns={[2, null, 3]} spacing="10px">
        {tags.map((item, index) => (
          <Tag key={index} value={item} onClose={handleClose} />
        ))}
      </SimpleGrid>
    </FormControl>
  );
};

export default TagSelector;
