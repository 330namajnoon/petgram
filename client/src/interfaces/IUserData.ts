import { IFollower } from "./IFollower";
import { IPet } from "./IPet";
import { IStoryAdress } from "./IStoryAdress";
export interface IUserData {
  id:string;
  fullName:string;
  image:string;
  followers:IFollower[];
  following:string[];
  pendingFollowers:IFollower[];
  storys:IStoryAdress[];
  pets:IPet[];
  language:string
}
