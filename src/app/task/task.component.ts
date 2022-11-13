import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {
  title: string = "";
  isValid: boolean = false;
  constructor(
    private backendService: BackendService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {}

  createTask() {
    if (!this.title) {
      this.isValid = true;
      return;
    }
    this.backendService.newTask({ description: this.title }).subscribe(() => {
      this.ref.close(true);
    });
  }
}
