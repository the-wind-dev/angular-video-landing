import { SomeVideoComponent } from "./some-video.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CommentContainerModule } from "../comment-container/comment-container.module";
import { CommentService } from "../comment.service";

@NgModule({
    declarations: [
        SomeVideoComponent
    ],
    exports: [
        SomeVideoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CommentContainerModule,
        
    ],
})

export class SomeVideoModule {}