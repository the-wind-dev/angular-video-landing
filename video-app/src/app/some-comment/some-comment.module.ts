import { SomeCommentComponent } from "./some-comment.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentContainerModule } from "../comment-container/comment-container.module";

@NgModule({
    declarations: [
        SomeCommentComponent,
    ],
    exports: [
        SomeCommentComponent
    ],
    imports: [
        CommonModule,
        CommentContainerModule
    ]

})

export class SomeCommentModule {}