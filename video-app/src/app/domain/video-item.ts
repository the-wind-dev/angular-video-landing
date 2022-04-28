import { Type } from '@angular/core';
import { Video } from './video';

export class VideoItem {
  constructor(public component: Type<any>, 
    public data: Video) {}
}