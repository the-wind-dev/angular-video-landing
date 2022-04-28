import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { MyCommentItem } from '../domain/myComment-item';
import { VideoComponentInterface } from '../domain/video-component-interface.component';

@Component({
  selector: 'app-some-video',
  templateUrl: './some-video.component.html',
  styleUrls: ['./some-video.component.scss'],
})

export class SomeVideoComponent implements VideoComponentInterface,  OnInit {
  @Input() data: any;

  comments: MyCommentItem[] = []

  @Input() 
  public textareaValue: string = ''

  constructor(private commentService: CommentService) { }

  public ngOnInit(): void {
    this.comments = this.commentService.getComments()
  }
}
