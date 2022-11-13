import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import {
  faCircleDot,
  faTableList,
  faFileCircleCheck,
  faSquarePlus,
  faUser,
  faXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { MenuItem, MessageService, PrimeNGConfig } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { TaskComponent } from "../task/task.component";
import { BackendService, User, Task } from "../backend.service";
import { UpdateTaskComponent } from "../update-task/update-task.component";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
  providers: [DialogService, MessageService],
})
export class TaskListComponent implements OnInit, OnDestroy {
  lstUserStory = [
    {
      id: "731593",
      user: "Son Phan",
      description: "Create managing app",
      state: "Committed",
      isCreated: false,
      lstTodo: [
        {
          id: "731594",
          user: "Son Phan",
          description: "Implement UI",
          state: "To Do",
        },
        {
          id: "731595",
          user: "Son Phan",
          description: "Implement UI",
          state: "To Do",
        },
      ],
      lstInprogress: [],
      lstDone: [],
    },
  ];
  description: string = "";
  dragedData = null;
  isCreated: boolean = false;
  faTableList = faTableList;
  faCircleDot = faCircleDot;
  faFileCircleCheck = faFileCircleCheck;
  faSquarePlus = faSquarePlus;
  faUser = faUser;
  faXmark = faXmark;
  faPenToSquare = faPenToSquare;
  isOpen: boolean = false;
  users: User[];
  tasks: Task[];
  selectedUser: User;
  items: MenuItem[];
  ref: DynamicDialogRef;
  tasksDone: Task[];
  tasksTodo: Task[];
  constructor(
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getTask();
  }

  getUsers() {
    this.backendService.users().subscribe((res) => {
      this.users = res;
    });
  }

  getTask() {
    this.backendService.tasks().subscribe((res) => {
      this.tasks = res;
      this.tasksTodo = res.filter((item) => !item.completed);
      this.tasksDone = res.filter((item) => item.completed);
    });
  }

  getUserById(id) {
    if (id) {
      return this.users.find((res) => res.id === id).name || "Unassignee";
    }
  }

  getName(value) {
    const array = value.split(" ");
    let name = "";
    for (const item of array) {
      name = name + item.charAt(0);
    }
    return name;
  }

  dragStart(e, c) {
    this.dragedData = c;
  }

  dragEnd(e) {}

  // drop(e, index) {
  //   if (this.dragedData) {
  //     switch (this.dragedData.state) {
  //       case "To Do":
  //         this.dragedData.state = "In Progress";
  //         this.lstUserStory[index].lstTodo = this.lstUserStory[
  //           index
  //         ].lstTodo.filter((todo) => todo.id !== this.dragedData.id);
  //         this.lstUserStory[index].lstInprogress.push(this.dragedData);
  //         this.dragedData = null;
  //         break;
  //       case "In Progress":
  //         this.dragedData.state = "Done";
  //         this.lstUserStory[index].lstInprogress = this.lstUserStory[
  //           index
  //         ].lstInprogress.filter(
  //           (inprogress) => inprogress.id !== this.dragedData.id
  //         );
  //         this.lstUserStory[index].lstDone.push(this.dragedData);
  //         this.dragedData = null;
  //         break;
  //     }
  //   }
  // }

  drop(e) {
    if (this.dragedData) {
      this.backendService.task(this.dragedData.id).subscribe((task) => {
        console.log(task);
        this.backendService.complete(task.id, true).subscribe(() => {
          this.getTask();
        });
      });
    }
  }

  handleString(value) {
    if (this.dragedData) {
      return `${value} + ${this.dragedData.id}`;
    }
  }

  addTask() {
    this.isCreated = true;
  }

  focusOut(index) {
    if (this.description) {
      this.lstUserStory[index].lstTodo.push({
        id: `${(Math.random() * 10000).toFixed(0)}`,
        user: "Unassigned",
        description: this.description,
        state: "To Do",
      });
      this.description = "";
      this.lstUserStory[index].isCreated = false;
    }
  }

  handleDetail(id) {
    this.router.navigateByUrl(`task/${id}`);
    return;
  }

  show() {
    this.ref = this.dialogService.open(TaskComponent, {
      header: "Create New Task",
      width: "35%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((isSuccess) => {
      if (isSuccess) {
        this.getTask();
      }
    });
  }

  showTaskById(task) {
    this.ref = this.dialogService.open(UpdateTaskComponent, {
      header: "Update Task",
      width: "35%",
      contentStyle: {
        "max-height": "500px",
        overflow: "auto",
        height: "220px",
      },
      baseZIndex: 10000,
      data: {
        task: task,
      },
    });
    this.ref.onClose.subscribe((isSuccess) => {
      if (isSuccess) {
        this.getTask();
      }
    });
  }

  filterTask() {
    const tasks = [...this.tasks];
    if (this.selectedUser) {
      this.tasksDone = tasks.filter((item) => item.completed === true && item.assigneeId === this.selectedUser.id);
      this.tasksTodo = tasks.filter((item) => item.completed !== true && item.assigneeId === this.selectedUser.id);
      return;
    }
    this.tasksDone = tasks.filter((item) => item.completed === true);
    this.tasksTodo = tasks.filter((item) => item.completed !== true);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
