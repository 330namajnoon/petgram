import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HomeService } from 'src/services/home.service';
import { AppService } from 'src/services/app.service';
import { IUserData } from 'src/interfaces/IUserData';
import { ProfileViewService } from 'src/services/profile-view.service';
import { IStoryAdress } from 'src/interfaces/IStoryAdress';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IFollower } from 'src/interfaces/IFollower';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent extends AppServiceEx implements OnInit {
  loading: boolean = true;
  constructor(private profileService: ProfileViewService, private acRoute: ActivatedRoute, private router: Router, private homeService: HomeService, appService: AppService) {
    super(appService)
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const _this = this;
        async function render() {
          let state = router.getCurrentNavigation()?.extras.state;
          if (state) {
            let data = state as { user: string; onload: boolean };
            if (data.onload) {
              _this.profileService.getProfileData()
              _this.loading = false;
              _this.setLoading(true);
              console.log(data.user)
              let res = await _this.profileService.downloadProfileData(data.user);
              _this.setLoading(false);

            }
          }
        }
        render();
      }
    })
  }

  ngOnInit(): void {

  }

  getMyProfile(): boolean {
    if (this.getProfileData().id == this.getUser().id) {
      return false;
    } else {
      return true;
    }
  }
  getProfileData(): IUserData {

    return this.profileService.getProfileData();
  }


  storysFilter(pet: string): IStoryAdress[] {
    let storys: IStoryAdress[] = [];
    this.getProfileData().storys.forEach(s => {
      if (s.pet_id == pet) storys.push(s);
    })
    return storys
  }

  pendingFollowersSearch(): boolean {
    let follower: IFollower | undefined = this.profileService.getProfileData().pendingFollowers.find(f => f.id == this.getUser().id);

    if (follower) {
      return true;
    } else {
      return false
    }
  }

  followersSearch(): boolean {
    let follower: IFollower | undefined = this.profileService.getProfileData().followers.find(f => f.id == this.getUser().id);
    if (follower) {
      return true;
    } else {
      return false
    }
  }

  follow(): void {
    let { image, name, lastName, id } = this.getUser();
    let follower: IFollower = {
      avatar: image, id, name, lastName
    }
    this.profileService.getProfileData().pendingFollowers.push(follower);
  }

  back() {

    let url: string[] = location.pathname.split("/").slice(1, location.pathname.split("/").length);
    url[0] = "/" + url[0];
    if (this.profileService.getProfileViewUrl().length > 0) {
      let userId: string = this.profileService.getProfileViewUrl()[this.profileService.getProfileViewUrl().length - 2];
      this.profileService.setProfileViewUrl(this.profileService.getProfileViewUrl().slice(0, -1));
      this.router.navigate(url.slice(0, -1), { state: { user: userId, onload: true } });
    } else {
      // this.router.navigate(["/petgram"]);

    }
  }
}
