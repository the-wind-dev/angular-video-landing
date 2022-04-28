import { Component, Input, OnInit } from '@angular/core';
import { myComment } from '../domain/myComment';

@Component({
  selector: 'app-some-comment',
  templateUrl: './some-comment.component.html',
  styleUrls: ['./some-comment.component.scss']
})
export class SomeCommentComponent implements OnInit {
  
  @Input() data!: myComment;
  // @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
