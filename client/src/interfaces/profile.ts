export interface CreateProfile {
  country: string;
  categories: string[];
  bio: string;
  isOnline: boolean;
  avatar?: File;
  banner?: File;
  phone?: string;
  email?: string;
  city?: string;
  postalCode?: string;
  area?: string;
  address?: string;
  [key: string]: string | string[] | File | boolean | undefined;
}

export interface Profile {
  id: string;
  userId: string;
  avatar: string;
  banner: string;
  categories: string[];
  isOnline: boolean;
  bio: string;
  city?: string;
  postalCode?: string;
  country?: string;
  area?: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt: string;
}
