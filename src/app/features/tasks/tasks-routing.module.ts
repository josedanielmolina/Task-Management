import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TaskListComponent },
    { path: 'new-task', component: TaskFormComponent },
    { path: 'edit-task/:id', component: TaskFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule { }
