export interface OptionItem {
  label: string;
  value: string;
}

export interface FilePicker {
  name: string;
  file: File;
}

export type FilePickerAccept = 'image/*' | '.pdf' | '.doc' | '.docx';

export type PreviewType = 'avatar' | 'banner' | 'pdf';

export interface MultiFilePickerItemData {
  name: string;
  file: File;
}

export interface ImagePickerItemData {
  name: string;
  files: File[];
}
