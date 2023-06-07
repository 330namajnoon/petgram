import { AppService } from "../app.service";

export class AppServiceEx {
  constructor(private appService:AppService) {}
  getDevice = this.appService.getDevice.bind(this.appService);
  socket = this.appService.socket;
  getUser = this.appService.getUser.bind(this.appService);
  getURL = this.appService.getURL.bind(this.appService);
  language = this.appService.language;
  createNewID = this.appService.createNewID.bind(this.appService);
  promiseType = this.appService.promiseType.bind(this.appService);
}
