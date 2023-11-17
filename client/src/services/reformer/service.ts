import { Service } from '@/interfaces/service';
import { formatDate } from '@/lib/date';
import { reformUser } from './user';
import { reformProfile } from './profile';

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
  user: reformUser(service.userId),
  profile: reformProfile(service.profileId),
});
