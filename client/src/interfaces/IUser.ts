
import { IFollower } from "./IFollower";
import { IStoryAdress } from "./IStoryAdress";
import { IPet } from "./IPet";

export interface IUser {
  id:string;
  name:string;
  lastName:string;
  birthDay:string;
  address:string;
  country:number;
  postalCode:number;
  phone:number;
  image:string
  email:string;
  password:string;
  language:string;
  followers:IFollower[];
  following:string[];
  pendingFollowers:IFollower[];
  storys:IStoryAdress[];
  pets:IPet[];


}
