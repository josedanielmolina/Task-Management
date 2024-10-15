import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Task, State } from '../models/task.model';
import { environment } from '../../../environments/environment.development';
import { handleError } from '../../shared/helpers/error-handler';
import { PaginatedResponse } from '../models/pagination.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = environment.url;

    constructor(private http: HttpClient) { }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/tasks`)
            .pipe(
                catchError(handleError)
            );
    }

    getTasksPaginated(page: number, perPage: number): Observable<PaginatedResponse<Task>> {

        let params = new HttpParams()
            .set('_page', page.toString())
            .set('_per_page', perPage.toString());

        return this.http.get<any>(`${this.apiUrl}/tasks`, { params }).pipe(
            map(response => {
                return {
                    pagination: {
                        first: response.first,
                        prev: response.prev,
                        next: response.next,
                        last: response.last,
                        pages: response.pages,
                        items: response.items
                    },
                    data: response.data
                } as PaginatedResponse<Task>;
            })
        );
    }

    getTask(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`)
            .pipe(
                catchError(handleError)
            );
    }

    addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/tasks`, task)
            .pipe(
                catchError(handleError)
            );
    }

    updateTask(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/tasks/${task.id}`, task)
            .pipe(
                catchError(handleError)
            );
    }

    deleteTask(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`)
            .pipe(
                catchError(handleError)
            );
    }

    getStates(): Observable<State[]> {
        return this.http.get<State[]>(`${this.apiUrl}/states`)
            .pipe(
                catchError(handleError)
            );
    }
}
