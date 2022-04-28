import { SomeVideoComponent } from "./some-video.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        SomeVideoComponent
    ],
    exports: [
        SomeVideoComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]

})

export class SomeVideoModule {}