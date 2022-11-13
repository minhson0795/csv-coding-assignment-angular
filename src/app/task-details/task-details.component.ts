import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService, Task, User } from '../backend.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  id: number;
  task: Task;
  users: User[];
  constructor(private route: ActivatedRoute, private backendService: BackendService) { }

  ngOnInit(): void {
    if (this.route) {
      this.id = this.route.snapshot.params['id'];
      if (this.id) {
        this.getTaskDetail();
      }
    }
    this.getUsers();
  }

  getUserById(id) {
    if (id) {
      return this.users.find((item) => item.id === id);
    }
  }

  getUsers() {
    this.backendService.users().subscribe((res) => {
      this.users = res;
    });
  }

  getTaskDetail() {
    this.backendService.task(this.id).subscribe((res) => {
      this.task = res;
    })
  }
}
