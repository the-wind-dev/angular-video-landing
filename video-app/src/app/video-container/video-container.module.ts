import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SomeVideoModule } from "../some-video/some-video.module";
import { VideoDirective } from "../video.directive";
import { VideoContainerComponent } from "./video-container.component";

@NgModule({
    declarations: [
        VideoContainerComponent,
        VideoDirective
    ],
    exports: [
        VideoContainerComponent
    ],
    imports: [
        CommonModule,
        // FormsModule
        SomeVideoModule
    ]
})

export class VideoContainerModule {}