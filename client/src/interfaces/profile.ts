export interface Profile {
  phone: string;
  email: string;
  avatar: File;
  banner: File;
  bio: string;
  city?: string;
  country?: string;
  area?: string;
  address?: string;
}
