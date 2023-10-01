import { ACTIONS, TaskModalActionsTypes } from "./actions";

interface TaskModalState {
    taskId: string | null;
    isActive: boolean;
}

const initialState: TaskModalState = {
    taskId: null,
    isActive: false,
};

const taskModalReducer = (
    state: TaskModalState = initialState,
    action: TaskModalActionsTypes,
): TaskModalState => {
    switch (action.type) {
        case ACTIONS.OPEN_TASK_MODAL:
            return {
                ...state,
                isActive: true,
                taskId: action.payload,
            };
        case ACTIONS.CLOSE_TASK_MODAL:
            return {
                ...state,
                isActive: false,
                taskId: null,
            };
        default:
            return state;
    }
};

export default taskModalReducer;
