import { Profile } from '@/interfaces/profile';
import { formatDate } from '@/lib/date';

export const reformProfile = (data: any): Profile => ({
  id: data._id,
  userId: data.userId,
  avatar: data.avatar,
  banner: data.banner,
  categories: data.categories,
  address: data.address,
  certificates: data.certificates.map((certificate: any) => ({
    id: certificate._id,
    name: certificate.name,
    file: certificate.file,
  })),
  isOnline: data.isOnline,
  email: data.email,
  phone: data.phone,
  bio: data.bio,
  city: data.city,
  postalCode: data.postalCode,
  country: data.country,
  area: data.area,
  createdAt: formatDate(data.createdAt),
});
