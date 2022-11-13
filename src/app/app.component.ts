import { Component, OnInit } from "@angular/core";
import { BackendService } from "./backend.service";
import { faBars, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { MenuItem, MessageService, PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  lstUserStory = ["US 1", "US 2", "US 3"];
  lstTodo = ["red", "green", "white"];
  lstProgress = ["In progress 1", "In progress 2", "In progress 3"];
  lstDone = ["Done 1", "Done 2", "Done 3"];
  colors = ["red", "green", "white"];
  droped = [];
  dragedColor = null;
  faBars = faBars;
  faCircleDot = faCircleDot;
  items: MenuItem[] = [];
  ngOnInit() {
    this.items = [
      {
        label: "Mealsuite",
        items: [
          {
            label: "List Task",
            icon: "pi pi-external-link",
            routerLink: "/tasks",
          },
          {
            label: "Mealsuite",
            icon: "pi pi-upload",
            url: "https://www.mealsuite.com/",
          },
        ],
      },
    ];
  }

  dragStart(e, c) {
    this.dragedColor = c;
  }

  dragEnd(e) {}

  drop(e) {
    if (this.dragedColor) {
      this.droped.push(this.dragedColor);
      this.dragedColor = null;
    }
  }
  constructor() {}
}
