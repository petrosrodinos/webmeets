export interface CreateProfile extends Address {
  country: string;
  categories: string[];
  bio: string;
  isOnline: boolean;
  avatar?: File;
  banner?: File;
  phone?: string;
  email?: string;
  [key: string]: string | string[] | File | boolean | undefined;
}

export interface Profile extends Address {
  id: string;
  userId: string;
  avatar: string;
  banner: string;
  categories: string[];
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
