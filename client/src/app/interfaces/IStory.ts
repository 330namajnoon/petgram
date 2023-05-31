import { ICommends } from "./ICommends";
export interface IStory {
  id: string;
  userName: string;
  user: string;
  profileImage: string;
  url: string;
  description: string;
  type: string;
  commends:ICommends[]
  likes: string[];
  view: string[];
  pet:string;
}
