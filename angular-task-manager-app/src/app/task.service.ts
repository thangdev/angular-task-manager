import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service'
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }


  getList() {
    return this.webRequestService.get('lists')
  }

  createList(title: string) {
    // create a list
    return this.webRequestService.post('lists', { title })
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`lists/${listId}/tasks`)
  }

  createTask(title: string, listId: string) {
    // create a task
    return this.webRequestService.post(`lists/${listId}/tasks`, { title })
  }

  completeTask (task: Task) {
    return this.webRequestService.put(`lists/${task._listId}/tasks/${task._id}`, {...task, completed: !task.completed})
  }



}
