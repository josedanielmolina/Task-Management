import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { Task } from '../../../core/models/task.model';
import { TranslateModule } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TaskComponent', () => {
    let component: TaskComponent;
    let fixture: ComponentFixture<TaskComponent>;
    let task: Task;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TaskComponent],
            imports: [
                TranslateModule.forRoot()
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;

        task = {
            id: '1',
            title: 'Test Task',
            description: 'Test Description',
            dueDate: new Date(),
            completed: false,
            stateHistory: [{ state: 'active', date: new Date() }],
            notes: ['Note 1', 'Note 2']
        };

        component.task = task;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display task details correctly', () => {
        const titleEl: HTMLElement = fixture.debugElement.query(By.css('.card-title')).nativeElement;
        const descriptionEl: HTMLElement = fixture.debugElement.query(By.css('.card-text')).nativeElement;
        const dueDateEl: HTMLElement = fixture.debugElement.query(By.css('.text-muted')).nativeElement;

        expect(titleEl.textContent).toContain(task.title);

        expect(descriptionEl.textContent).toContain(task.description);

        expect(dueDateEl.textContent).toContain('task.dueDate: 2024-10-14');
    });


    it('should show the complete button if task is not completed', () => {
        const completeButton: DebugElement = fixture.debugElement.query(By.css('.btn-success'));
        expect(completeButton).toBeTruthy();

        component.task.completed = true;
        fixture.detectChanges();
        const hiddenCompleteButton = fixture.debugElement.query(By.css('.btn-success'));
        expect(hiddenCompleteButton).toBeFalsy();
    });

    it('should emit edit event when edit button is clicked', () => {
        spyOn(component.edit, 'emit');
        const editButton = fixture.debugElement.query(By.css('.btn-outline-primary'));
        editButton.triggerEventHandler('click', null);

        expect(component.edit.emit).toHaveBeenCalledWith(task);
    });

    it('should emit delete event when delete button is clicked', () => {
        spyOn(component.delete, 'emit');
        const deleteButton = fixture.debugElement.query(By.css('.btn-outline-danger'));
        deleteButton.triggerEventHandler('click', null);

        expect(component.delete.emit).toHaveBeenCalledWith(task.id);
    });

    it('should emit complete event when complete button is clicked', () => {
        spyOn(component.complete, 'emit');
        const completeButton = fixture.debugElement.query(By.css('.btn-success'));
        completeButton.triggerEventHandler('click', null);

        expect(component.complete.emit).toHaveBeenCalledWith(task.id);
    });

    it('should display the correct task state', () => {
        const stateBadge: HTMLElement = fixture.debugElement.query(By.css('.badge')).nativeElement;
        expect(stateBadge.textContent).toContain('active');

        component.task.stateHistory[component.task.stateHistory.length - 1].state = 'closed';
        fixture.detectChanges();
        const updatedStateBadge: HTMLElement = fixture.debugElement.query(By.css('.badge')).nativeElement;
        expect(updatedStateBadge.textContent).toContain('closed');
    });

});
