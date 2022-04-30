import { Inject, Injectable } from '@angular/core';
import { API_SERVER_PATH } from "./tokens";
import { HttpClient } from "@angular/common/http"
import { firstValueFrom } from "rxjs";

import { Video } from './domain/video';

@Injectable()
export class VideoService {
  
  constructor(private httpClient: HttpClient,
              @Inject(API_SERVER_PATH) private apiServerPath: string) {
              }
  

  public getAllVideos(): Promise<Video[]> {

    return firstValueFrom(this.httpClient.get<Video[]>(`${this.apiServerPath}/videos`))

  }

  public getVideoById(id: number): Promise<Video> {

    return firstValueFrom(this.httpClient.get<Video>(`${this.apiServerPath}/videos/${id}`))

  }
}
