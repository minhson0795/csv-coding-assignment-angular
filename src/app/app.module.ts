import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { DragDropModule } from "primeng/dragdrop";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { TaskComponent } from "src/app/task/task.component";
import { TaskListComponent } from "src/app/task-list/task-list.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { MenuModule } from "primeng/menu";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { ToastModule } from 'primeng/toast';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

@NgModule({
  declarations: [AppComponent, TaskComponent, TaskListComponent, UpdateTaskComponent, TaskDetailsComponent],
  imports: [
    BrowserModule,
    DragDropModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    FormsModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    MenuModule,
    DynamicDialogModule,
    ToastModule,
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
