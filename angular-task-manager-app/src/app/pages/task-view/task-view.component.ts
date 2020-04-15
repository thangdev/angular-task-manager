import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service'
import { ActivatedRoute } from '@angular/router'
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.taskService.getTasks(params.listId).subscribe((tasksData: Task[]) => this.tasks = tasksData)
    });
    this.taskService.getList().subscribe((listsData: List[]) => this.lists = listsData)
  }

  onTaskClicked(task: Task) {
    // set task is completed
    this.taskService.completeTask(task).subscribe(() => {
      task.completed = !task.completed
    })
  }







}
