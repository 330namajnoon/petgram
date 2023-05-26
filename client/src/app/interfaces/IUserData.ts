import { IFollower } from "./IFollower";
export interface IUserData {
  user:string;
  userName:string;
  profileImage:string;
  followers:IFollower[];
  following:string[];
  pendingFollowers:string[];
  storys:string[];
  pets:string[];

}
