import { Type } from '@angular/core';
import { MyComment } from './myComment';

export class MyCommentItem {
  constructor(public component: Type<any>, 
    public data: MyComment) {}
}