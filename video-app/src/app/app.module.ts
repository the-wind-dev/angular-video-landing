import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentService } from './comment.service';
import { API_SERVER_PATH } from './tokens';

import { VideoContainerModule } from './video-container/video-container.module';

import { VideoService } from './video.service';

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    VideoContainerModule,
    HttpClientModule
  ],

  providers: [
    VideoService,
    CommentService,
    {
      provide: API_SERVER_PATH,
      useValue: "http://localhost:3000"
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
