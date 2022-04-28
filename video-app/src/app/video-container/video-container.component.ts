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
  minVideoHeight: number = 500;

  @ViewChild(VideoDirective, { static: true }) videoHost!: VideoDirective;
  

  ngOnInit(): void {
   
    this.primaryVideoLoading(this.minVideoHeight)

    this.startGettingVideo()
    
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScrollToBottom)
  }

  
  public loadVideoById(videoId: number) {
    const videoItem = this.videos[videoId];

    const viewContainerRef = this.videoHost.viewContainerRef;

    const componentRef = viewContainerRef.createComponent<VideoComponentInterface>(
      videoItem.component
    );

    componentRef.instance.data = videoItem.data;
  }

  /**
   * проверка, кончились ли видео для загрузки
   * @returns {boolean} true, если видео закончились
   */
  public checkVideosFinished(): boolean {

    if (this.currentVideoIndex >= (this.videos.length - 1)) {
      return true  
    } else {
      return false
    }
  }

  public primaryVideoLoading(itemMinHeight: number): void {
    const currentHeight: number = document.documentElement.clientHeight
    const needToLoad: number = (currentHeight / itemMinHeight) + 1

    for (this.currentVideoIndex; this.currentVideoIndex < needToLoad; this.currentVideoIndex++) {

      this.loadVideoById(this.currentVideoIndex)

      console.log(this.currentVideoIndex)
    }

  }
  
  public onScrollToBottom = () => {

      const currentPositionRelativBottom: number = document.documentElement.getBoundingClientRect().bottom
      const currentHeight: number = document.documentElement.clientHeight

      if (currentPositionRelativBottom < currentHeight + 50) {

        this.loadVideoById(this.currentVideoIndex)
        
        if (this.checkVideosFinished()) {
          window.removeEventListener('scroll', this.onScrollToBottom)
        }

        this.currentVideoIndex++

      } 
  }

  public startGettingVideo(): void {
    window.addEventListener('scroll', this.onScrollToBottom)  
  }
}