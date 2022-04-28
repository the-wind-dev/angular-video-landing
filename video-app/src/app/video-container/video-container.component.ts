import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { VideoComponentInterface } from "../domain/video-component-interface.component";
import { VideoItem } from "../domain/video-item";
import { VideoDirective } from "../video.directive";

@Component({
    selector: 'app-video-container',
    templateUrl: './video-container.component.html',
    styleUrls: ['./video-container.component.scss'],
    
})

export class VideoContainerComponent implements OnInit, OnDestroy {
  @Input() videos: VideoItem[] = [];

  currentVideoIndex: number = 0;

  @ViewChild(VideoDirective, { static: true }) videoHost!: VideoDirective;
  interval: number | undefined;

  ngOnInit(): void {
    //   FIXME: настроить логику количества видео при первой загрузке
    this.loadComponentById(0);
    this.loadComponentById(1);
    this.getVideo();
    console.log(this.videos)
    
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
    const videoItem = this.videos[this.currentVideoIndex];

    const viewContainerRef = this.videoHost.viewContainerRef;
    // viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<VideoComponentInterface>(
      videoItem.component
    );
    // console.log('***', adItem.component);
    componentRef.instance.data = videoItem.data;
  }

  loadComponentById(videoId: number) {
    // this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
    const videoItem = this.videos[videoId];

    const viewContainerRef = this.videoHost.viewContainerRef;
    // viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<VideoComponentInterface>(
      videoItem.component
    );
    // console.log('***', adItem.component);
    componentRef.instance.data = videoItem.data;
  }

  getVideos() {
    // this.interval = window.setInterval(() => {
    //   this.loadComponent();
    // }, 3000);
    for (let video of this.videos) {
        console.log(video)
        this.loadComponent()
    }
    this.interval = window.setInterval(() => {
        let currentPositionRelativBottom: number =  document.documentElement.getBoundingClientRect().bottom
        console.log('currentPositionRelativBottom', currentPositionRelativBottom)
        let currentHeight: number = document.documentElement.clientHeight
        console.log('currentHeight=',currentHeight)
        if (currentPositionRelativBottom < currentHeight + 50) {
            console.log('we are at the bottom!')
        }
    }, 100000);
  }

  public checkEnd(): boolean {
    if (this.currentVideoIndex >= (this.videos.length - 1)) {
            console.log('пора удалять')
            return true
            
        } else {
            console.log('удалять еще рано')
            return false
        }
  }

  public onScrollToBottom = () => {

      let currentPositionRelativBottom: number = document.documentElement.getBoundingClientRect().bottom
      let currentHeight: number = document.documentElement.clientHeight

      if (currentPositionRelativBottom < currentHeight + 50) {

        console.log('we are at the bottom! Loading next video now')

        this.loadComponentById(this.currentVideoIndex)

        console.log(`loading: ${this.currentVideoIndex} video`)

        this.currentVideoIndex++

        if (this.checkEnd()) {
            window.removeEventListener('scroll', this.onScrollToBottom)
        }

    } else {console.log('рано')}
  }

  public getVideo(): void {

    window.addEventListener('scroll', this.onScrollToBottom)  
  }
}