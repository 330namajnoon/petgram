import { IFollower } from "./IFollower";
import { IPet } from "./IPet";
import { IStoryAdress } from "./IStoryAdress";
export interface IUserData {
  user:string;
  userName:string;
  profileImage:string;
  followers:IFollower[];
  following:string[];
  pendingFollowers:string[];
  storys:IStoryAdress[];
  pets:IPet[];

}
