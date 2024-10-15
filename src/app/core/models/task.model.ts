export interface Task {
    id?: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    stateHistory: { state: string, date: Date }[];
    notes: string[];
}

export interface State {
    name: string;
}
