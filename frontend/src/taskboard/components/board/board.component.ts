import {Component, ChangeDetectionStrategy} from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { TaskDto } from '../../client/model/taskDto';
import { TasksService } from '../../services/tasks.service'; 
import { TaskItemComponent } from '../task-item/task-item.component'; 

@Component({
  selector: 'taskboard-board',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, ScrollingModule,TaskItemComponent],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  providers: [ TasksService ]
})
export class BoardComponent {
  todo: Array<TaskDto> = [];
  doing: Array<TaskDto> = [];
  done: Array<TaskDto> = [];

  constructor(private task_backend: TasksService){
    this.task_backend= task_backend;
  }
 
  ngOnInit() {
    this.update();
  }
  
  update() {
    this.task_backend.getTasks()
      .then(all_tasks => this.groupTasks(all_tasks));
  }

  groupTasks(tasks: Array<TaskDto>) {
    this.todo = [];
    this.doing = [];
    this.done = [];

    tasks.forEach((task: TaskDto) => {
      switch(task.status) {
        case TaskDto.StatusEnum.TODO:
          this.todo.push(task);
          break;
        case TaskDto.StatusEnum.DOING:
          this.doing.push(task);
          break;
        case TaskDto.StatusEnum.DONE:
          this.done.push(task);
          break;
        default:
          console.error(`Task ${task.id} has no defined status`);
      }
    });
  }

  drop(event: CdkDragDrop<TaskDto[]>) {
    const target_array = event.container.data;
    const origin_array = event.previousContainer.data;
    const origin_index = event.previousIndex - 1;
    const moving_task = origin_array[origin_index];
    
    if (event.previousContainer === event.container) {      // container stays in current list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {                                                // container moves from one list to another
      switch (target_array) {
        case this.todo:
          if (moving_task.id) {
            moving_task.status = TaskDto.StatusEnum.TODO;
            this.task_backend.updateTask(moving_task.id, moving_task).then(()=> this.update());
          }
          break;
        case this.doing:
          if (moving_task.id) {
            moving_task.status = TaskDto.StatusEnum.DOING;
            this.task_backend.updateTask(moving_task.id, moving_task).then(()=>this.update());
          }
          break;
        case this.done:
          if (moving_task.id) {
            moving_task.status = TaskDto.StatusEnum.DONE;
            this.task_backend.updateTask(moving_task.id, moving_task).then(()=>this.update());
          }
          break;
      }
    }
  }
}

