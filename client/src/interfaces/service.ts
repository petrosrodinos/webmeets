import { Profile } from './profile';
import { User } from './user';

export interface Service {
  id: string;
  name: string;
  description: string;
  banner: string;
  category: string;
  createdAt: string;
  certificates: { id: string; name: string; file: string }[];
  profile: Profile;
  user: User;
}
