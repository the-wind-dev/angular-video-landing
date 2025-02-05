import { Inject, Injectable } from '@angular/core';


import { SomeCommentComponent } from './some-comment/some-comment.component';
import { MyCommentItem } from './domain/myComment-item';
import { MyComment } from './domain/myComment';
import { HttpClient } from '@angular/common/http';
import { API_SERVER_PATH } from './tokens';
import { firstValueFrom } from 'rxjs';
import { ArrayMyComment } from './domain/arrayMyComments';

@Injectable()
export class CommentService {
  constructor(private httpClient: HttpClient,
    @Inject(API_SERVER_PATH) private apiServerPath: string) {
  }


  public getAllCommentsForVideo(hostId: number): Promise<ArrayMyComment> {

    return firstValueFrom(this.httpClient.get<ArrayMyComment>(`${this.apiServerPath}/comments/${hostId}`))

  }

  public updateComment(hostId: number, comments: ArrayMyComment): Promise<ArrayMyComment> {

    return firstValueFrom(this.httpClient.put<ArrayMyComment>(`${this.apiServerPath}/comments/${hostId}`, comments))

  }
  

  // public getCommentById(id: number): Promise<MyComment> {

  //   return firstValueFrom(this.httpClient.get<MyComment>(`${this.apiServerPath}/comments/${id}`))

  // }
  
}