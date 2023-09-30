import { PayloadAction } from "store/types";

import { ITask } from "types/task.interface";

export const ACTIONS = {
    ADD_TASK: "ADD_TASK",
    DELETE_TASK: "DELETE_TASK",
    UPDATE_TASK: "UPDATE_TASK",
} as const;

type AddTaskAction = PayloadAction<typeof ACTIONS.ADD_TASK, ITask>;
type DeleteTaskAction = PayloadAction<typeof ACTIONS.DELETE_TASK, string>;
type UpdateTaskAction = PayloadAction<typeof ACTIONS.UPDATE_TASK, ITask>;

export type TasksActionsTypes =
    | AddTaskAction
    | DeleteTaskAction
    | UpdateTaskAction;
