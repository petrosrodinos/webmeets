import { FC, useState } from 'react';
import { FormControl, FormLabel, Select, SimpleGrid } from '@chakra-ui/react';
import Tag from '../Tag';

interface TagSelectorProps {
  name: string;
  label?: string;
  items: string[];
  onChange: (name: string, items: string[]) => void;
}

const TagSelector: FC<TagSelectorProps> = ({ name, items, onChange, label }) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (e: any) => {
    if (tags.includes(e.target.value)) return;
    const newTags = [...tags, e.target.value];
    setTags(newTags);
    onChange(name, newTags);
  };

  const handleClose = (item: string) => {
    if (tags.length === 1) return;
    const newTags = tags.filter((i) => i !== item);
    setTags(newTags);
    onChange(name, newTags);
  };

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Select mb={2} onChange={handleChange}>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </Select>
      <SimpleGrid columns={[2, null, 3]} spacing="10px">
        {tags.map((item, index) => (
          <Tag key={index} value={item} onClose={handleClose} />
        ))}
      </SimpleGrid>
    </FormControl>
  );
};

export default TagSelector;
