import { SomeVideoComponent } from "./some-video.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        SomeVideoComponent
    ],
    exports: [
        SomeVideoComponent
    ],
    imports: [
        CommonModule
    ]

})

export class SomeVideoModule {}