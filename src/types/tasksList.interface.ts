import { ITask } from "./task.interface";

export interface ITasksList {
    id: string;
    tasks: ITask[];
    title: string;
}
