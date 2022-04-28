import { SomeCommentComponent } from "./some-comment.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CommentDirective } from "../comment.directive";
import { CommentContainerModule } from "../comment-container/comment-container.module";

@NgModule({
    declarations: [
        SomeCommentComponent,
        // CommentDirective
    ],
    exports: [
        SomeCommentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CommentContainerModule
    ]

})

export class SomeCommentModule {}