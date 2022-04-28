import { SomeCommentComponent } from "./some-comment.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CommentDirective } from "../comment.directive";

@NgModule({
    declarations: [
        SomeCommentComponent,
        CommentDirective
    ],
    exports: [
        SomeCommentComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]

})

export class SomeCommentModule {}