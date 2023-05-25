import { IUserPet } from './IUserPet';

export interface IUser {
  user: string;
  username: string;
  email: string;
  password: string;
  pet: IUserPet[];
  storys: string;
  image: string;
}
