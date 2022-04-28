import { Injectable } from '@angular/core';


import { SomeCommentComponent } from './some-comment/some-comment.component';
import { MyCommentItem } from './domain/myComment-item';

@Injectable()
export class CommentService {
  getComments() {
    return [
      new MyCommentItem(SomeCommentComponent, {
        text: 'text in comment 1'
        }),
      new MyCommentItem(SomeCommentComponent, {
        text: 'text in comment 2 afkasjflk'
        }),
    ];
  }
}