import { Meet } from '@/interfaces/meet';
import { formatDate } from '@/lib/date';
import { reformService } from './service';
import { reformProfile } from './profile';
import { reformUser } from './user';

export const reformMeet = (meet: any): Meet => ({
  id: meet._id,
  name: meet.name,
  description: meet.description,
  phone: meet.phone,
  duration: meet.duration,
  maxParticipants: meet.maxParticipants,
  price: meet.price,
  type: meet.type,
  createdAt: formatDate(meet.createdAt),
  images: meet.images.map((certificate: any) => ({
    id: certificate._id,
    file: certificate.file,
  })),
  service: {
    ...reformService(meet.serviceId),
    profile: reformProfile(meet.profileId),
    user: reformUser(meet.userId),
  },
});
