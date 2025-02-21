import {Component} from '@angular/core';
import { BoardComponent } from './components/board/board.component'; 

@Component({
  selector: 'taskboard-root',
  imports: [
    BoardComponent
  ],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.css'
})
export class TaskboardComponent {
  title = 'TaskBoard Frontend';
}
