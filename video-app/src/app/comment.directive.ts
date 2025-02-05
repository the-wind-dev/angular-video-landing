import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[commentHost]',
})
export class CommentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
