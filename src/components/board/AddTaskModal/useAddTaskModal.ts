import { useCallback, useState } from "react";

import { v4 as generateId } from "uuid";

import useTypedDispatch from "hooks/shared/useTypedDispatch";

import { ISubtask, ITask } from "types/task.interface";

import { TaskStatuses } from "constants/taskStatuses";

import { AddTaskFormState } from "./AddTaskForm/AddTaskForm";

const useAddTaskModal = (projectId: string) => {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useTypedDispatch();

    const handleAddTask = useCallback(
        (data: AddTaskFormState) => {
            const title = data.title.trim();
            const description = data.description.trim();
            const subtasks = data.subtasks;

            const newSubtasks: ISubtask[] = subtasks.map((subtask) => ({
                id: generateId(),
                isCompleted: false,
                title: subtask.title,
            }));

            if (!title || !description) {
                return;
            }

            const newTask: ITask = {
                title,
                id: generateId(),
                projectId,
                description,
                isCompleted: false,
                status: TaskStatuses.DEVELOPING,
                subtasks: newSubtasks,
            };

            dispatch({ type: "ADD_TASK", payload: newTask });

            setIsActive(false);
        },
        [dispatch, projectId],
    );

    const handleClose = () => setIsActive(false);

    const handleOpen = () => setIsActive(true);

    return { isActive, handleAddTask, handleClose, handleOpen };
};

export default useAddTaskModal;
