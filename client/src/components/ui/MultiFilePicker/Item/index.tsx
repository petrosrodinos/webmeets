import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import FileUpload from "../../FilePicker";
import Input from "../../Input";
import { IoAdd } from "react-icons/io5";
import {
  FilePickerAccept,
  PreviewType,
  MultiFilePickerItemData,
} from "../../../../interfaces/components";

interface ItemProps {
  inputLabel: string;
  itemName: string;
  nameValue?: string;
  fileValue?: File;
  accept?: FilePickerAccept;
  previewType?: PreviewType;
  onAdd: (data: MultiFilePickerItemData) => void;
}

const Item: FC<ItemProps> = ({
  itemName,
  inputLabel,
  nameValue = "",
  fileValue,
  accept,
  previewType,
  onAdd,
}) => {
  const [file, setFile] = useState<File | undefined>(fileValue);
  const [fileName, setFileName] = useState(nameValue);

  const handleAdd = () => {
    if (!file || !fileName) return;
    onAdd({
      file,
      name: fileName,
    });
    setFileName("");
    setFile(undefined);
  };

  const handleFileChange = ({ file, name }: { file: File; name: any }) => {
    setFile(file);
  };

  const handleNameChange = (e: any) => {
    setFileName(e.target.value);
  };

  return (
    <AccordionItem width={"100%"}>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {itemName}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Input
          value={fileName}
          onChange={handleNameChange}
          label={inputLabel}
          placeholder={inputLabel}
        />
        <FileUpload
          placeholder="Add file"
          previewType={previewType}
          onChange={handleFileChange}
          label="File"
          name="file"
          accept={accept}
        />
        <Button rightIcon={<IoAdd />} title="Add" colorScheme="green" onClick={handleAdd}>
          Add
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Item;
