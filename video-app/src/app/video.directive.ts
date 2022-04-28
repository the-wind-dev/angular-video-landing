import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[videoHost]',
})
export class VideoDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
