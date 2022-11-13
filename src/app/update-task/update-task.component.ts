import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { BackendService, User, Status } from "../backend.service";

@Component({
  selector: "app-update-task",
  templateUrl: "./update-task.component.html",
  styleUrls: ["./update-task.component.css"],
})
export class UpdateTaskComponent implements OnInit {
  users: User[];
  selectedUser: User;
  status: Status[];
  selectedStatus: Status;
  constructor(
    private backendService: BackendService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getStatus();
  }

  getUsers() {
    this.backendService.users().subscribe((res) => {
      this.users = res;
    });
  }

  getStatus() {
    this.backendService.status().subscribe((res) => {
      this.status = res;
    });
  }

  updateTask() {
    if (this.config.data) {
      const id = this.config.data.task.id;
      if (this.selectedUser) {
        this.backendService.assign(id, this.selectedUser.id).subscribe();
      }
      if (this.selectedStatus) {
        let status = this.selectedStatus.state === "To Do" ? false : true;
        this.backendService.complete(id, status).subscribe();
      }
      this.ref.close(true);
    }
  }
}
