import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { IStoryLink } from 'src/interfaces/IStoryLink';
import { IStory } from 'src/interfaces/IStory';
import { IComment } from 'src/interfaces/IComment';
import { AppService } from 'src/services/app.service';
import { HomeService } from 'src/services/home.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { ILike } from 'src/interfaces/ILike';
import { IView } from 'src/interfaces/IView';
import { ProfileViewService } from 'src/services/profile-view.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent extends AppServiceEx implements AfterViewInit, OnInit {
  @ViewChild(VideoPlayerComponent)videoPlayerComponent!:VideoPlayerComponent;
  @ViewChild('videoPlayer',{read:ElementRef})videoPlayer!:ElementRef;
  @ViewChild("container") container!: ElementRef;
  constructor(private http: HttpClient, appService: AppService,public homeService: HomeService, private router: Router,private prS:ProfileViewService) {
    super(appService)
  }
  storysStyle = { height: `${window.innerHeight - (this.getDevice() == 'container_mobile' ? 55 : 80)}px` };
  story!: IStory;
  @Input() data!: IStoryLink;
  @Input() id!: number;
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.homeService.set(`story${this.id}`, this);
    let container: HTMLElement = this.container.nativeElement;
    container.addEventListener("touchstart", (e: TouchEvent) => {

      let y1 = e.touches[0].pageY;
      container.addEventListener("touchend", (ee: TouchEvent) => {
        let y2 = ee.changedTouches[0].pageY;
        let next = y2 - y1 < 0 ? this.id + 1 : this.id - 1;
        if (y2 - y1 !== 0) this.homeService.get(`story${next}`).downloadStory();
      })
    })
    if (this.id == 0) this.downloadStory();
  }
  searchLikes(): boolean {
    let like = this.story?.likes.find(l => l.user_id == this.getUser().id);
    if (like) {
      return true;
    } else {
      return false;
    }
  }
  searchViews(): boolean {
    let view = this.story?.views.find(l => l.user_id == this.getUser().id);
    if (view) {
      return true;
    } else {
      return false;
    }

  }
  like(): void {
    if(!this.searchLikes())
      this.socket.emit("like",this.story.id,this.getUser().id);
  }
  downloadStory(): void {
    let _this = this;
    if (!this.story) {

      this.http.post<IStory>(`${this.getURL()}/downloadStory`, this.data).subscribe(_story => {
        let story: IStory = _story;
        let m = this.typePromise("img", story.type) ? new Image() : document.createElement("video");
        m.src = story.url;

        m.addEventListener("loadedmetadata",()=> {
          _this.story = story;
          this.socket.on("comment" + _this.story?.id, (comment) => {
            _this.story.comments.push(comment);
          })
          if(!this.searchViews())this.socket.emit("view",this.story.id,this.getUser().id);
          this.socket.on("view" + this.story?.id, (view) => {
            this.story?.views.push(view as IView);
          })
          this.socket.on("like" + this.story?.id, (like) => {
            this.story?.likes.push(like as ILike);
          })
        })
        m.addEventListener("load", () => {

          _this.story = story;
          this.socket.on("comment" + _this.story?.id, (comment) => {
            console.log(comment);
            _this.story.comments.push(comment);
          })
          if(!this.searchViews())this.socket.emit("view",this.story.id,this.getUser().id);
          this.socket.on("view" + this.story?.id, (view) => {
            this.story?.views.push(view as IView);
          })
          this.socket.on("like" + this.story?.id, (like) => {
            this.story?.likes.push(like as ILike);
          })

        })
      })

    }
  }
  getScrollTop(): number {
    let c: any = document.getElementById('home_storys');
    return c.scrollTop;
  }
  getStory() {
    return this.story;
  }
  getCommends() {
    return this.story.comments;
  }


  getProfileView(): void {
    this.homeService.getVideoPlayerControl()();
    let url: string[] = location.pathname.split("/").slice(1, location.pathname.split("/").length);
    url[0] = "/" + url[0];
    url.push("profile_view");
    this.prS.setProfileViewUrl([this.story?.user_id]);
    this.router.navigate(url, { state: { user: this.story?.user_id } });
  }
}
