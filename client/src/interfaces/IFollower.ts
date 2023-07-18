export interface IFollower {
  avatar: string;
  id: string;
  name: string;
  lastName: string;
  status?: 'pending' | 'accepted';
}
