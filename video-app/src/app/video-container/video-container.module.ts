import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
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
        
    ]
})

export class VideoContainerModule {}