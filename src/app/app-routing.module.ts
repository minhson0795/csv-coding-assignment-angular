import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from "src/app/task-list/task-list.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";

const routes: Routes = [
  { path: "task/:id", component: TaskDetailsComponent },
  { path: "tasks", component: TaskListComponent },
  { path: '',   redirectTo: '/tasks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
