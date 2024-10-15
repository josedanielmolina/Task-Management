import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { State, Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css'
})

export class TaskFormComponent implements OnInit {
    taskForm!: FormGroup;
    states: State[] = [];
    isEditMode: boolean = false;
    taskId!: string;
    stateHistory: { state: string, date: Date }[] = [];
    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router,
        private notificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.createForm();
        this.loadStates();
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.taskId = params['id'];
                this.loadTask(this.taskId);
            }
        });
    }

    createForm() {
        this.taskForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            dueDate: ['', Validators.required],
            currentState: ['', Validators.required],
            notes: this.fb.array([this.fb.control('', Validators.required)])
        });
    }

    loadStates() {
        this.taskService.getStates().subscribe(states => {
            this.states = states;
        });
    }

    loadTask(id: string) {
        this.loading = true;
        this.taskService.getTask(id).subscribe({
            next: (task: Task) => {
                this.taskForm.patchValue({
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate,
                    currentState: task.stateHistory[task.stateHistory.length - 1].state
                });
                this.stateHistory = task.stateHistory;
                this.taskForm.setControl('notes', this.fb.array(task.notes.map(note => this.fb.control(note, Validators.required))));
            },
            complete: () => {
                this.loading = false;
            },
            error: (e) => {
                this.loading = false;
                this.notificationsService.showError(e.message);
            }
        });
    }

    get notesArray() {
        return this.taskForm.get('notes') as FormArray;
    }

    addNote() {
        this.notesArray.push(this.fb.control('', Validators.required));
    }

    removeNote(index: number) {
        this.notesArray.removeAt(index);
    }

    goBack() {
        this.router.navigate(['/tasks']);
    }

    onSubmit() {
        if (this.taskForm.valid) {
            const { currentState, ...taskData } = this.taskForm.value;
            const date = new Date();
            const isCompleted = currentState.toLowerCase() === 'closed';
            const task: Task = {
                ...taskData,
                completed: isCompleted,
                stateHistory: this.isEditMode
                    ? [...this.stateHistory, { state: currentState, date: date }]
                    : [{ state: currentState, date: date }]
            };


            this.loading = true;
            if (this.isEditMode) {
                task.id = this.taskId;
                this.taskService.updateTask(task).subscribe({
                    next: () => {
                        this.router.navigate(['/tasks']);
                        this.notificationsService.showSuccess('message.taskUpdated');
                    },
                    complete: () => {
                        this.loading = false;
                    },
                    error: (e) => {
                        this.loading = false;
                        this.notificationsService.showError(e.message);
                    }
                });
            } else {
                this.taskService.addTask(task).subscribe({
                    next: () => {
                        this.router.navigate(['/tasks']);
                        this.notificationsService.showSuccess('message.taskCreated');
                    },
                    complete: () => {
                        this.loading = false;
                    },
                    error: (e) => {
                        this.loading = false;
                        this.notificationsService.showError(e.message);
                    }
                });
            }
        }
    }




}
