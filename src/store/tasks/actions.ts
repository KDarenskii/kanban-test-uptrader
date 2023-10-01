import { PayloadAction } from "store/types";

import { ITask } from "types/task.interface";

import { TaskStatuses } from "constants/taskStatuses";

export const ACTIONS = {
    ADD_TASK: "ADD_TASK",
    DELETE_TASK: "DELETE_TASK",
    UPDATE_TASK: "UPDATE_TASK",
    SWAP_TASKS: "SWAP_TASKS",
} as const;

type AddTaskAction = PayloadAction<typeof ACTIONS.ADD_TASK, ITask>;
type DeleteTaskAction = PayloadAction<typeof ACTIONS.DELETE_TASK, string>;
type UpdateTaskAction = PayloadAction<
    typeof ACTIONS.UPDATE_TASK,
    Partial<ITask>
>;
type SwapTasksAction = PayloadAction<
    typeof ACTIONS.SWAP_TASKS,
    {
        dir: "up" | "down";
        taskToSwapId: string;
        dropOnTaskId: string;
        newStatus: TaskStatuses;
    }
>;

export type TasksActionsTypes =
    | AddTaskAction
    | DeleteTaskAction
    | UpdateTaskAction
    | SwapTasksAction;
