import { Component, ComponentFactoryResolver, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommentDirective } from '../comment.directive';
import { CommentService } from '../comment.service';
import { MyComment } from '../domain/myComment';
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
  
  comments: MyCommentItem[] = []

  @Input() 
  public videoId: number = 0

  public buttonId: string = `button-${this.videoId}`

  @Input() 
  public textareaValue: string = ''

  @ViewChild(CommentDirective, {static: true}) commentHost!: CommentDirective
  
  constructor(public commentService: CommentService) { }

  public ngOnInit(): void {
    
    this.buttonId = `button-${this.videoId}`

    this.commentService.getAllCommentsForVideo(this.videoId)

    .then( (comments) => {

      this.renderComments(comments.arrayOfComments)

      const sendButton = document.getElementById(this.buttonId)

      sendButton?.addEventListener('click', () => {
        
        if (this.textareaValue) {

          this.renderComment({ text: this.textareaValue })

          comments.arrayOfComments.push({ text: this.textareaValue })

          this.commentService.updateComment(this.videoId, comments)

          this.textareaValue = ''

        } else { alert('comment is empty') }

      })

    })
    .catch( (error) => {console.error(error)})

  }
   
  /**
   * рендер всех переданных комментариев
   * @param {MyComment[]} comments комментарии для рендеринга
   */
  public renderComments(comments: MyComment[]) {
    
    comments.forEach( (item, i, arr) => {
      this.renderComment(item)
    })

  }
  /**
   * рендер комментария
   * @param {MyComment} comment 
   */
  public renderComment(comment: MyComment) {

    const commentItem = new MyCommentItem(SomeCommentComponent, comment)

    const viewContainerRef = this.commentHost.viewContainerRef

    const componentRef = viewContainerRef.createComponent<MyCommentComponentInterface>(
      commentItem.component
    )

    componentRef.instance.data = commentItem.data
  }


  
  public onChange(comment: string): void {
  }

  public onTouch(): void {}

  //можно не обновлять значение при каждом изменении, а обновлять только при отправке
  public onChangeTextareaValue(newValue: string): void {

    this.textareaValue = newValue

    this.onChange(newValue)

  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }
  
  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn
  }
  
  //но вообще этот метод не вызывается, потому что не пишем ничего отсюда в textarea
  public writeValue(comment: string): void {
    if (comment === null) {
        console.log('comment === null')
        return
    }
    this.textareaValue = comment
  }

  

}
