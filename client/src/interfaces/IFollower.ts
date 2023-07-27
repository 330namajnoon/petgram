export interface IFollower {
  image: string;
  id: string;
  name: string;
  lastName: string;
  status?: 'pending' | 'accepted';
}
