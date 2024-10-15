import { Component, OnInit } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { PaginatedResponse } from '../../../core/models/pagination.model';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

    tasks: Task[] = [];
    currentPage: number = 1;
    pageSize: number = 5;
    totalPages: number = 1;
    totalItems: number = 0;
    pagination: PaginatedResponse<Task>['pagination'] = {} as PaginatedResponse<Task>['pagination'];
    loading: boolean = false;

    constructor(
        private taskService: TaskService,
        private router: Router,
        private notificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.loadTasks(this.currentPage);
    }

    loadTasks(page: number) {
        this.loading = true;

        this.taskService.getTasksPaginated(page, this.pageSize).subscribe({
            next: (response: PaginatedResponse<Task>) => {
                this.tasks = response.data;
                this.pagination = response.pagination;
                this.totalPages = response.pagination.pages;
                this.totalItems = response.pagination.items;
                this.currentPage = page;
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

    prevPage() {
        if (this.pagination.prev) {
            this.loadTasks(this.pagination.prev);
        }
    }

    nextPage() {
        if (this.pagination.next) {
            this.loadTasks(this.pagination.next);
        }
    }

    addTask() {
        this.router.navigate(['/new-task']);
    }

    editTask(task: Task) {
        this.router.navigate(['/edit-task', task.id]);
    }

    async deleteTask(id: string) {
        const confirmDelete = await this.notificationsService.confirmDelete('message.confirmDeleteTask');
        if (!confirmDelete) {
            return;
        }

        this.loading = true;

        this.taskService.deleteTask(id).subscribe({
            next: () => {
                this.loadTasks(this.currentPage);
                this.notificationsService.showSuccess('message.success');
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

    completeTask(id: string) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.loading = true;
            task.completed = true;

            if (!task.stateHistory) {
                task.stateHistory = [];
            }

            task.stateHistory.push({
                state: 'closed',
                date: new Date()
            });

            this.taskService.updateTask(task).subscribe({
                next: updatedTask => {
                    this.loadTasks(this.currentPage);
                    this.notificationsService.showSuccess('message.success');
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
