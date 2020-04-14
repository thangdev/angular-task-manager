import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service'

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  createList() {
    this.taskService.createList('testing').subscribe((res) => {
      console.log(res )
    })
  }

}
