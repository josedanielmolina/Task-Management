import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { TaskComponent } from './task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form/task-form.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        TaskListComponent,
        TaskComponent,
        TaskFormComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        TasksRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class TasksModule { }
