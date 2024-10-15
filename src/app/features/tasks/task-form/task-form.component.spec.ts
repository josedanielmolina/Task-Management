import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { of } from 'rxjs';
import { Task } from '../../../core/models/task.model';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';

describe('TaskFormComponent', () => {
    let component: TaskFormComponent;
    let fixture: ComponentFixture<TaskFormComponent>;
    let mockTaskService: jasmine.SpyObj<TaskService>;
    let mockNotificationsService: jasmine.SpyObj<NotificationsService>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockActivatedRoute: any;

    beforeEach(() => {
        mockTaskService = jasmine.createSpyObj('TaskService', ['getStates', 'getTask', 'addTask', 'updateTask']);
        mockNotificationsService = jasmine.createSpyObj('NotificationsService', ['showSuccess', 'showError']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        mockActivatedRoute = {
            params: of({ id: '1' })
        };

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, CommonModule, SharedModule],
            declarations: [TaskFormComponent],
            providers: [
                { provide: TaskService, useValue: mockTaskService },
                { provide: NotificationsService, useValue: mockNotificationsService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskFormComponent);
        component = fixture.componentInstance;

        mockTaskService.getStates.and.returnValue(of([{ name: 'New' }, { name: 'In Progress' }, { name: 'Closed' }]));

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form correctly', () => {
        expect(component.taskForm).toBeDefined();
        expect(component.taskForm.controls['title']).toBeDefined();
        expect(component.taskForm.controls['description']).toBeDefined();
        expect(component.taskForm.controls['dueDate']).toBeDefined();
        expect(component.taskForm.controls['currentState']).toBeDefined();
        expect(component.taskForm.controls['notes']).toBeDefined();
    });

    it('should load states on init', () => {
        component.loadStates();
        expect(mockTaskService.getStates).toHaveBeenCalled();
        expect(component.states.length).toBe(3);
    });

    it('should load task in edit mode', () => {
        const date = new Date();
        const mockTask: Task = {
            id: '1',
            title: 'Test Task',
            description: 'Test Description',
            dueDate: date,
            completed: false,
            stateHistory: [{ state: 'active', date: new Date() }],
            notes: ['Note 1']
        };

        mockTaskService.getTask.and.returnValue(of(mockTask));
        component.loadTask('1');

        expect(mockTaskService.getTask).toHaveBeenCalledWith('1');
        expect(component.taskForm.controls['title'].value).toBe('Test Task');
        expect(component.taskForm.controls['description'].value).toBe('Test Description');
        expect(component.taskForm.controls['dueDate'].value).toBe(date);
        expect(component.taskForm.controls['currentState'].value).toBe('active');
    });



    it('should add and remove notes', () => {
        expect(component.notesArray.length).toBe(1);

        component.addNote();
        expect(component.notesArray.length).toBe(2);

        component.removeNote(0);
        expect(component.notesArray.length).toBe(1);
    });

    it('should navigate back to tasks list on goBack', () => {
        component.goBack();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
    });
});
