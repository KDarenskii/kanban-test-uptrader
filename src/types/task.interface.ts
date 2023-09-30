import { TaskStatuses } from "constants/taskStatuses";

export interface ISubtask {
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface ITask extends ISubtask {
    description: string;
    status: TaskStatuses;
    subtasks: ISubtask[];
    projectId: string;
}
