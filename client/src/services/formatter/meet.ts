import { Meet } from '@/interfaces/meet';
import { formatDate } from '@/lib/date';
import { formatProfile } from './profile';
import { formatUser } from './user';

export const formatMeet = (meet: any): Meet => ({
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
  rating: meet?.rating || 0,
  hours: meet.hours,
  images: meet.images.map((certificate: any) => ({
    id: certificate._id,
    file: certificate.file,
  })),
  profile: formatProfile(meet.profileId),
  user: formatUser(meet.userId),
});
