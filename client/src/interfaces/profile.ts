export interface CreateProfile extends Address {
  country: string;
  categories: string[];
  bio: string;
  certificates: { name: string; file: File }[];
  isOnline: boolean;
  avatar?: File;
  banner?: File;
  phone?: string;
  email?: string;
  [key: string]: string | string[] | File | boolean | undefined | { name: string; file: File }[];
}

export interface Profile extends Address {
  id: string;
  userId: string;
  avatar: string;
  banner: string;
  categories: string[];
  certificates: { id: string; name: string; file: string }[];
  isOnline: boolean;
  bio: string;
  country?: string;
  phone?: string;
  email?: string;
  createdAt: string;
}

export interface Address {
  city?: string;
  postalCode?: string;
  area?: string;
  address?: string;
}
