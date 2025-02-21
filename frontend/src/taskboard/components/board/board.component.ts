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

@Component({
  selector: 'taskboard-board',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, ScrollingModule],
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
    if (event.previousContainer === event.container) {      // container stays in current list
      console.log("nothing was moved");
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {                                                // container moves from one list to another
      // TODO: update backend on success update state; on error show error notification
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

