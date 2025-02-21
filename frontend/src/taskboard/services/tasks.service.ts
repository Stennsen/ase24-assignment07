import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { firstValueFrom, catchError, map, takeUntil } from 'rxjs';
import * as E from 'fp-ts/Either';

import {TaskDto} from '../client/model/taskDto';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for backend calls related to tasks.
 */
export class TasksService {
  baseUrl = '/api/tasks';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get all tasks.
   */
  public getTasks(): Promise<Array<TaskDto>> {
    const url = this.baseUrl;
    return firstValueFrom(this.httpClient.get<Array<TaskDto>>(url));
  }

  public updateTask(id: string, updated_task: TaskDto): Promise<TaskDto> {
    const url = this.baseUrl;
    return firstValueFrom(
      this.httpClient.put<TaskDto>(`${this.baseUrl}/${id}`,updated_task)
    );
  }

  public deleteTask(id: string): Promise<void> {
    const url = this.baseUrl;
    return firstValueFrom(
      this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
    );
  }

}
