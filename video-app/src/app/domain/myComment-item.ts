import { Type } from '@angular/core';
import { myComment } from './myComment';

export class MyCommentItem {
  constructor(public component: Type<any>, 
    public data: myComment) {}
}