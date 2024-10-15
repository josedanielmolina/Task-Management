import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../core/models/task.model';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrl: './task.component.css'
})
export class TaskComponent {

    @Input() task!: Task;
    @Output() edit = new EventEmitter<Task>();
    @Output() delete = new EventEmitter<string>();
    @Output() complete = new EventEmitter<string>();

    onEdit() {
        this.edit.emit(this.task);
    }

    onDelete() {
        this.delete.emit(this.task.id);
    }

    onComplete() {
        this.complete.emit(this.task.id);
    }

}
