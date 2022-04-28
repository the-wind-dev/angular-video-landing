import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommentDirective } from '../comment.directive';
import { MyCommentComponentInterface } from '../domain/myComment-component-interface';
import { MyCommentItem } from '../domain/myComment-item';
import { SomeCommentComponent } from '../some-comment/some-comment.component';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => SomeCommentComponent),
      multi: true,
    }
  ]
})
export class CommentContainerComponent implements OnInit, ControlValueAccessor {
  @Input() comments: MyCommentItem[] = []

  @Input() 
  public textareaValue: string = ''

  @ViewChild(CommentDirective, {static: true}) commentHost!: CommentDirective
  
  constructor() { }

  public ngOnInit(): void {

    this.loadAllComments()

  }

  public loadCommentById(commentId: number): void {
    const commentItem = this.comments[commentId]

    const viewContainerRef = this.commentHost.viewContainerRef

    const componentRef = viewContainerRef.createComponent<MyCommentComponentInterface>(
      commentItem.component
    )

    componentRef.instance.data = commentItem.data
  }

  public loadAllComments(): void {
    for (let commentId = 0; commentId < this.comments.length; commentId++) {
      this.loadCommentById(commentId)
    }
  }
// --------------------------
  // работаем с textarea
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
    // можно поставить disable на кнопку
    if (this.textareaValue === '') {
      alert(`you can't leave an empty comment`)
      return
    }

    this.addComment(this.textareaValue)

    this.textareaValue = ''
    //тут можно испооьзовать writeValue 
    // this.writeValue('')
  }
  
  //но вообще этот метод не вызывается, потому что не пишем ничего отсюда в textarea
  public writeValue(comment: string): void {
    if (comment === null) {
        console.log('comment === null')
        return
    }
    this.textareaValue = comment
  }

  public addComment(newComment: string): void {

    this.comments.push( new MyCommentItem(SomeCommentComponent, {
      text: newComment
    }))
    
    this.loadCommentById(this.comments.length - 1)
  }

}
