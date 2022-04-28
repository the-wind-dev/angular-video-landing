import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommentService } from '../comment.service';
import { MyCommentItem } from '../domain/myComment-item';
import { VideoComponentInterface } from '../domain/video-component-interface.component';

@Component({
  selector: 'app-some-video',
  templateUrl: './some-video.component.html',
  styleUrls: ['./some-video.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => SomeVideoComponent),
      multi: true,
    }
  ]
})
export class SomeVideoComponent implements VideoComponentInterface, ControlValueAccessor, OnInit {
  @Input() data: any;

  comments: MyCommentItem[] = []

  @Input() 
  public textareaValue: string = ''

  constructor(private commentService: CommentService) { }

  //вроде не нужен
  public ngOnInit(): void {
    this.comments = this.commentService.getComments()
  }

  public onChange(comment: string): void {
  }

  public onTouch(): void {}

  //можно не обновлять значение при каждом изменении, а обновлять только при отправке
  public onChangeTextareaValue(newValue: string): void {
    this.textareaValue = newValue
    this.onChange(newValue)
    // console.log(this.textareaValue)
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
    
  }
  
  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn
  }
  
  public onClickSendButton(): void {
    console.log('send:')
    console.log(this.textareaValue)
    this.textareaValue = ''
  }
  // нужна проверка на путой комментарий, сейчас она не работает или её нет
  public writeValue(comment: string): void {
    if (comment === null) {
        console.log('comment === null')
        return
    }

    this.textareaValue = comment
    console.log(this.textareaValue)
  }
}
