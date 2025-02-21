import {Component} from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskDto } from '../../client/model/taskDto';
import { BoardStateService } from '../../services/board-state.service'; 

@Component({
  selector: 'taskboard-board',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  providers: [ BoardStateService ]
})
export class BoardComponent {

  constructor(private state: BoardStateService){}
 

  drop(event: CdkDragDrop<TaskDto[]>) {
    if (event.previousContainer === event.container) {      // container stays in current list
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

