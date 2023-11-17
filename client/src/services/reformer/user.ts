import { User } from '@/interfaces/user';

export const reformUser = (data: any): User => ({
  id: data._id,
  firstname: data.firstname,
  lastname: data.lastname,
  avatar: data.avatar,
});
