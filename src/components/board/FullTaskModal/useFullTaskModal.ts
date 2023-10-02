import { useState } from "react";

import { v4 as generateId } from "uuid";

import { selectModalTask } from "store/taskModal/selectors";
import { selectTaskById } from "store/tasks/selectors";

import useTypedDispatch from "hooks/shared/useTypedDispatch";
import useTypedSelector from "hooks/shared/useTypedSelector";

import { ISubtask, ITask } from "types/task.interface";

import { EditTaskFormState } from "./EditTaskForm/EditTaskForm";

const useFullTaskModal = () => {
    const dispatch = useTypedDispatch();
    const { isActive, taskId } = useTypedSelector(selectModalTask);
    const [isEditing, setIsEditing] = useState(false);

    const task = useTypedSelector((state) => selectTaskById(state, taskId));

    const handleChangeCompleteStatus = (id: string) => {
        if (!task) return;
        const updatedTasks = task.subtasks.map((subtask) => {
            if (subtask.id === id) {
                subtask.isCompleted = !subtask.isCompleted;
                return subtask;
            }
            return subtask;
        });

        dispatch({ type: "UPDATE_TASK", payload: { subtasks: updatedTasks } });
    };

    const handleSubmitEditing = (data: EditTaskFormState) => {
        const title = data.title.trim();
        const description = data.description.trim();

        const newSubtasks: ISubtask[] = data.subtasks
            .filter((subtask) => subtask.title.trim().length > 0)
            .map((subtask) => ({
                id: generateId(),
                isCompleted: false,
                title: subtask.title,
            }));

        if (!title || !description || !task) {
            return;
        }

        const updatedTask: Partial<ITask> = {
            title,
            description,
            subtasks: newSubtasks,
            priority: data.priority,
            status: data.status,
            id: task.id,
        };

        dispatch({ type: "UPDATE_TASK", payload: updatedTask });

        setIsEditing(false);
    };

    const handleOpenEditing = () => {
        setIsEditing(true);
    };

    const handleCloseEditing = () => {
        setIsEditing(false);
    };

    const handleCloseModal = () => {
        dispatch({ type: "CLOSE_TASK_MODAL" });
    };

    return {
        task,
        isActive,
        isEditing,
        handleCloseModal,
        handleChangeCompleteStatus,
        handleOpenEditing,
        handleCloseEditing,
        handleSubmitEditing,
    };
};

export default useFullTaskModal;
