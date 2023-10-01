import { TaskPriority } from "constants/taskPriority";
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
    createdAt: Date;
    finishDate: Date;
    priority: TaskPriority;
    number: number;
    file: {
        name: string;
        blob: Blob;
    } | null;
}
