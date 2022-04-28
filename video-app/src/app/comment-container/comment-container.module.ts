import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommentDirective } from "../comment.directive";
import { CommentContainerComponent } from "./comment-container.component";

@NgModule({
    declarations: [
        CommentContainerComponent,
        CommentDirective
    ],
    exports: [
        CommentContainerComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})

export class CommentContainerModule {}