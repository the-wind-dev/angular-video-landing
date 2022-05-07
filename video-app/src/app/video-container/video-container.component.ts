import { Component,  OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Video } from "../domain/video";
import { VideoComponentInterface } from "../domain/video-component-interface.component";
import { VideoItem } from "../domain/video-item";
import { SomeVideoComponent } from "../some-video/some-video.component";
import { VideoDirective } from "../video.directive";
import { VideoService } from "../video.service";

@Component({
    selector: 'app-video-container',
    templateUrl: './video-container.component.html',
    styleUrls: ['./video-container.component.scss'],
    
})

export class VideoContainerComponent implements OnInit, OnDestroy {

  videos: VideoItem[] = [];

  private currentVideoIndex: number = 1;

  private minVideoHeight: number = 500;

  public controller = new AbortController()

  @ViewChild(VideoDirective, { static: true }) videoHost!: VideoDirective;
  
  constructor(public videoService: VideoService) {
  }

  public ngOnInit(): void {
    
    this.videoService.getAllVideos()
    .then( (videos) => {

      this.currentVideoIndex = 0
      
      // предполагается, что изначально загружены не все видео
      this.primaryVideoRendering(this.minVideoHeight, videos)
    
      window.addEventListener('scroll',  () => this.onScrollToBottom(videos), {signal: this.controller.signal})
    
    })
    .catch( (error) => {console.error(error)})

  }
  
  /**
   * при достижении конца страницы рендерит следующее видео
   * если видео закончились, что удаляет обработчк 'scroll'
   * @param {Video[]} videos массив видео, который будет рендериться
   */
  public onScrollToBottom = (videos: Video[]):void =>  {

    const currentPositionRelativBottom: number = document.documentElement.getBoundingClientRect().bottom

    const currentHeight: number = document.documentElement.clientHeight

    if (currentPositionRelativBottom < currentHeight + 50) {

      // console.log('загружаю  видео', this.currentVideoIndex)

      this.renderVideo(videos[this.currentVideoIndex])
      
      // console.log('видео', this.currentVideoIndex , ' загружено')

      if (this.currentVideoIndex >= (videos.length - 1)) {
        
        this.controller.abort()

        // console.log('обработчик удален')
      }
      
      this.currentVideoIndex++
    }
  }

  /**
   * производит рендер видео 
   * @param {Video} videoExample объект Video
   */
  public renderVideo(videoExample: Video) {

    const videoItem = new VideoItem(SomeVideoComponent, videoExample)

    const viewContainerRef = this.videoHost.viewContainerRef;
    
    const componentRef = viewContainerRef.createComponent<VideoComponentInterface>(

      videoItem.component
    );

    componentRef.instance.data = videoItem.data;
  }

  ngOnDestroy() {
    this.controller.abort()
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
  /**
   * производит первичную загрузку нужного количества видео, так чтобы был скролл
   * @param {number} itemMinHeight минимально возможная высота компонента
   * @param {Video[]} videos массив видео, который будет рендериться
   */
  public primaryVideoRendering(itemMinHeight: number, videos: Video[]): void {

    const currentHeight: number = document.documentElement.clientHeight

    const needToLoad: number = Math.ceil(currentHeight / itemMinHeight) 
    

    for (let i = 1; i <= needToLoad; i++) {

      this.renderVideo(videos[this.currentVideoIndex ])

      this.currentVideoIndex++

    }
  }
}