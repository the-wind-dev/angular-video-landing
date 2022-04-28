import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { SomeVideoComponent } from './some-video.component';
import { SomeVideoModule } from './some-video/some-video.module';
// import { VideoContainerComponent } from './video-container/video-container.component';
// import { VideoContainerComponent } from './video-container.component';
import { VideoContainerModule } from './video-container/video-container.module';

import { VideoService } from './video.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SomeVideoModule,
    VideoContainerModule
  ],
  providers: [ VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
