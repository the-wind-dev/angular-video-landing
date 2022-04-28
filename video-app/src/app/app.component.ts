import { Component, OnInit } from '@angular/core';
import { VideoItem } from './domain/video-item';
import { VideoService } from './video.service';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <p>this is app-root</p>
    <app-video-container [videos]="videos"></app-video-container>
  </div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  videos: VideoItem[] = []

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videos = this.videoService.getVideos()
  }
}
