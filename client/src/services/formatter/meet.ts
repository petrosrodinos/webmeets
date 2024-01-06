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
  hours: formatHours(meet.hours),
  closingPeriods: formatClosingPeriods(meet?.closures || []),
  images: formatImages(meet.images),
  profile: formatProfile(meet.profileId),
  user: formatUser(meet.userId),
});

export const formatHours = (hours: any) => {
  return hours.map((hour: any) => ({
    id: hour._id,
    day: hour.day,
    periods: hour.periods.map((period: any) => ({
      id: period._id,
      from: period.from,
      to: period.to,
    })),
  }));
};

export const formatClosingPeriods = (closingPeriods: any) => {
  return closingPeriods.map((closingPeriod: any) => ({
    id: closingPeriod._id,
    name: closingPeriod.name,
    description: closingPeriod.description,
    from: closingPeriod.from,
    to: closingPeriod.to,
  }));
};

export const formatImages = (images: any) => {
  return images.map((image: any) => ({
    id: image._id,
    file: image.file,
  }));
};
