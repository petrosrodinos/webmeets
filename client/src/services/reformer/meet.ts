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
  category: meet.category,
  duration: meet.duration,
  maxParticipants: meet.maxParticipants,
  price: meet.price,
  type: meet.type,
  createdAt: formatDate(meet.createdAt),
  city: meet.city,
  address: meet.address,
  area: meet.area,
  postalCode: meet.postalCode,
  images: meet.images.map((certificate: any) => ({
    id: certificate._id,
    file: certificate.file,
  })),
  profile: reformProfile(meet.profileId),
  user: reformUser(meet.userId),
});
