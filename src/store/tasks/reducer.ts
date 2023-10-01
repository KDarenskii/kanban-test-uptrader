import { ITask } from "types/task.interface";

import { ACTIONS, TasksActionsTypes } from "./actions";

interface TasksState {
    tasks: ITask[];
}

const initialState: TasksState = {
    tasks: [],
};

const tasksReducer = (
    state: TasksState = initialState,
    action: TasksActionsTypes,
): TasksState => {
    switch (action.type) {
        case ACTIONS.ADD_TASK:
            return {
                ...state,
                tasks: state.tasks.concat(action.payload),
            };
        case ACTIONS.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        case ACTIONS.UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.id) {
                        return { ...task, ...action.payload };
                    }
                    return task;
                }),
            };
        case ACTIONS.SWAP_TASKS:
            const { dir, dropOnTaskId, taskToSwapId, newStatus } =
                action.payload;
            const taskToSwapIndex = state.tasks.findIndex(
                (task) => task.id === taskToSwapId,
            );
            const dropOnTaskIndex = state.tasks.findIndex(
                (task) => task.id === dropOnTaskId,
            );

            if (taskToSwapIndex === -1 || dropOnTaskIndex === -1) {
                return state;
            }

            const newTasksArray = [...state.tasks];
            // mutates the array
            const deletedTask = newTasksArray.splice(taskToSwapIndex, 1);
            deletedTask[0].status = newStatus;

            console.log(deletedTask);

            const indexToInsert =
                dir === "up" ? dropOnTaskIndex : dropOnTaskIndex + 1;

            newTasksArray.splice(indexToInsert, 0, deletedTask[0]);

            return {
                ...state,
                tasks: newTasksArray,
            };
        default:
            return state;
    }
};

export default tasksReducer;
