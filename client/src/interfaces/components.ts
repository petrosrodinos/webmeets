export interface OptionItem {
  label: string;
  value: string;
}

export interface FilePicker {
  name: string;
  file: File;
}

export type FilePickerAccept = "image/*" | ".pdf" | ".doc" | ".docx";

export type PreviewType = "avatar" | "banner" | "pdf";

export interface MultiFilePickerItemData {
  name: string;
  file: File;
}

export interface ImagePickerFile {
  id: string;
  file: File;
}

export interface ImagePickerItemData {
  name: string;
  files: ImagePickerFile[];
}

export interface BookingCalendarEvent {
  id: string;
  title: string;
  resourceId?: string;
  startEditable?: boolean;
  durationEditable?: boolean;
  date?: Date;
  className?: string;
  start?: any;
  color?: string;
  end?: any;
  allDay?: boolean;
  extendedProps?: any;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}
