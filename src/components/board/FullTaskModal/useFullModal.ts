import { selectModalTask } from "store/taskModal/selectors";
import { selectTaskById } from "store/tasks/selectors";

import useTypedDispatch from "hooks/shared/useTypedDispatch";
import useTypedSelector from "hooks/shared/useTypedSelector";

const useFullModal = () => {
    const dispatch = useTypedDispatch();
    const { isActive, taskId } = useTypedSelector(selectModalTask);

    const task = useTypedSelector((state) => selectTaskById(state, taskId));

    const handleChangeCompleteStatus = (id: string) => {
        const updatedTasks = task?.subtasks.map((subtask) => {
            if (subtask.id === id) {
                subtask.isCompleted = !subtask.isCompleted;
                return subtask;
            }
            return subtask;
        });

        dispatch({ type: "UPDATE_TASK", payload: { subtasks: updatedTasks } });
    };

    const handleClose = () => {
        dispatch({ type: "CLOSE_TASK_MODAL" });
    };

    return {
        task,
        isActive,
        handleClose,
        handleChangeCompleteStatus,
    };
};

export default useFullModal;
