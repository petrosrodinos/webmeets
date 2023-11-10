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
          <Item
            nameValue={files[0]?.name}
            fileValue={files[0]?.file}
            itemName={`${itemName} 1`}
            inputLabel={inputLabel}
            onAdd={handleAdd}
            accept={accept}
            previewType={previewType}
          />
          {files.map((file, index) => (
            <Item
              key={index}
              itemName={`${itemName} ${index + 1}`}
              inputLabel={inputLabel}
              nameValue={file.name}
              fileValue={file.file}
              onAdd={handleAdd}
              accept={accept}
              previewType={previewType}
            />
          ))}
        </Accordion>
      </FormControl>
    </>
  );
};

export default MultiFilePicker;
