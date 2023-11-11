import { Service } from '@/interfaces/service';
import { formatDate } from '@/lib/date';

export const reformService = (service: any): Service => ({
  id: service._id,
  name: service.name,
  description: service.description,
  banner: service.banner,
  category: service.category,
  createdAt: formatDate(service.createdAt),
  certificates: service.certificates.map((certificate: any) => ({
    id: certificate._id,
    name: certificate.name,
    file: certificate.file,
  })),
  user: {
    id: service.userId._id,
    firstname: service.userId.firstname,
    lastname: service.userId.lastname,
    avatar: service.userId.avatar,
  },
  profile: {
    id: service.profileId._id,
    userId: service.profileId.userId,
    avatar: service.profileId.avatar,
    banner: service.profileId.banner,
    categories: service.profileId.categories,
    address: service.profileId.address,
    isOnline: service.profileId.isOnline,
    email: service.profileId.email,
    phone: service.profileId.phone,
    bio: service.profileId.bio,
    city: service.profileId.city,
    postalCode: service.profileId.postalCode,
    country: service.profileId.country,
    area: service.profileId.area,
    createdAt: formatDate(service.profileId.createdAt),
  },
});
