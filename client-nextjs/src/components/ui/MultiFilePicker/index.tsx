import { Accordion, FormControl, FormLabel } from '@chakra-ui/react';
import { FC, useState } from 'react';
import Item from './Item';
import { FilePickerAccept, MultiFilePickerItemData, PreviewType } from '@/interfaces/components';

interface MultiFilePickerProps {
  onChange: (data: MultiFilePickerItemData[]) => void;
  label: string;
  accept?: FilePickerAccept;
  previewType?: PreviewType;
  inputLabel: string;
  itemName: string;
}

const MultiFilePicker: FC<MultiFilePickerProps> = ({ label, inputLabel, itemName, accept, previewType, onChange }) => {
  const [files, setFiles] = useState<MultiFilePickerItemData[]>([]);

  const handleAdd = (data: MultiFilePickerItemData) => {
    const newFiles = [...files, data];
    console.log(newFiles);
    setFiles(newFiles);
    onChange(newFiles);
  };

  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Accordion width={'100%'} defaultIndex={[0]} allowMultiple>
          {files.length == 0 && (
            <Item
              itemName={`${itemName} 1`}
              inputLabel={inputLabel}
              onAdd={handleAdd}
              accept={accept}
              previewType={previewType}
            />
          )}
          {files.map((file, index) => (
            <Item
              key={index}
              itemName={`${itemName} ${index + 1} g`}
              inputLabel={inputLabel}
              nameValue={file.name}
              fileValue={file.file}
              onAdd={handleAdd}
              accept={accept}
              previewType={previewType}
            />
          ))}
          {files.length > 0 && (
            <Item
              itemName={`${itemName} ${files.length + 1} b`}
              inputLabel={inputLabel}
              onAdd={handleAdd}
              accept={accept}
              previewType={previewType}
            />
          )}
        </Accordion>
      </FormControl>
    </>
  );
};

export default MultiFilePicker;
