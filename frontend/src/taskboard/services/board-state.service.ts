import { Injectable } from '@angular/core';
import { TasksService } from './tasks.service'; 
import { TaskDto } from '../client/model/taskDto'; 

@Injectable({
  providedIn: 'root'
})
export class BoardStateService {
  private todo: Array<TaskDto> = [];
  private doing: Array<TaskDto> = [];
  private done: Array<TaskDto> = [];

  constructor(private task_backend: TasksService){
    this.task_backend.getTasks()
      .then(tasks => {this.tasks = tasks});
  }

  public getAllTasks(): Array<TaskDto> {
    return this.todo.concat(this.doing, this.done);
  }
}
