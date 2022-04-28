import { Injectable } from '@angular/core';


import { SomeVideoComponent } from './some-video/some-video.component';
import { VideoItem } from './domain/video-item';

@Injectable()
export class VideoService {
  getVideos() {
    return [
      new VideoItem(SomeVideoComponent, {
        name: 'Jellyfish-1',
        videoSrc: '../../../../assets/videos/video_1.mp4',
      }),
      new VideoItem(SomeVideoComponent, {
        name: 'Daffodils-2',
        videoSrc: '../../../../assets/videos/video_2.mp4',
      }),
      new VideoItem(SomeVideoComponent, {
        name: 'Wildflowers-3',
        videoSrc: '../../../../assets/videos/video_3.mp4',
      }),
      new VideoItem(SomeVideoComponent, {
        name: 'Daffodils-4',
        videoSrc: '../../../../assets/videos/video_2.mp4',
      }),
      new VideoItem(SomeVideoComponent, {
        name: 'Wildflowers-5',
        videoSrc: '../../../../assets/videos/video_3.mp4',
      }),
    ];
  }
}