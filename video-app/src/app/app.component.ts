import { Component, OnInit } from '@angular/core';
import { VideoItem } from './domain/video-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  videos: VideoItem[] = []

  constructor() {}

  ngOnInit() {
  }
}
