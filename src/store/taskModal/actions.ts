import { PayloadAction, TypedAction } from "store/types";

export const ACTIONS = {
    OPEN_TASK_MODAL: "OPEN_TASK_MODAL",
    CLOSE_TASK_MODAL: "CLOSE_TASK_MODAL",
} as const;

type OpenTaskModal = PayloadAction<typeof ACTIONS.OPEN_TASK_MODAL, string>;
type CloseTaskModal = TypedAction<typeof ACTIONS.CLOSE_TASK_MODAL>;

export type TaskModalActionsTypes = OpenTaskModal | CloseTaskModal;
