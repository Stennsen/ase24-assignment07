import { Component, Input } from '@angular/core';
import { TaskDto } from '../../client/model/taskDto'; 

@Component({
  selector: 'taskboard-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task?: TaskDto;
}
