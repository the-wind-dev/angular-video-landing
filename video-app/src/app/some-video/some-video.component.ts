import { Component, Input } from '@angular/core';
import { VideoComponentInterface } from '../domain/video-component-interface.component';

@Component({
  selector: 'app-some-video',
  templateUrl: './some-video.component.html',
  styleUrls: ['./some-video.component.scss']
})
export class SomeVideoComponent implements VideoComponentInterface {

  constructor() { }
  @Input() data: any;
}
