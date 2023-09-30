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
        default:
            return state;
    }
};

export default tasksReducer;
