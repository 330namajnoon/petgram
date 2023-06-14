import { Languages } from 'src/assets/js/Languages';
import { IPet } from './IPet';
import { IFollower } from './IFollower';
export interface IUser {
  id:string;
  name:string;
  lastName:string;
  birthDay:string;
  address:string;
  country:string;
  postalCode:number;
  phone:number;
  image:string
  email:string;
  password:string;
  Language:string;
  pets: IPet[];
  followers:IFollower[];
  following:string[];
  pendingFollowers:IFollower[];
}
