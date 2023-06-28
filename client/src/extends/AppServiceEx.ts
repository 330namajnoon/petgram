import { AppService } from "src/services/app.service";

export class AppServiceEx {
  constructor(private appService:AppService) {}
  getDevice = this.appService.getDevice.bind(this.appService);
  socket = this.appService.socket;
  getUser = this.appService.getUser.bind(this.appService);
  setUser = this.appService.setUser.bind(this.appService);
  getURL = this.appService.getURL.bind(this.appService);
  language = this.appService.language;
  createNewUnikID = this.appService.createNewUnikID.bind(this.appService);
  typePromise = this.appService.typePromise.bind(this.appService);
  setLoading = this.appService.setLoading.bind(this.appService);
  getLoading = this.appService.getLoading.bind(this.appService);
}
