import { IComment } from "./IComment";
import { ILike } from "./ILike";
import { IView } from "./IView";
export interface IStory {
  id:string;
  user_id: string;
  fullName:string;
  profileImage: string;
  url: string;
  description: string;
  type: string;
  comments:IComment[]
  likes: ILike[];
  views: IView[];
  pet:string;
}
