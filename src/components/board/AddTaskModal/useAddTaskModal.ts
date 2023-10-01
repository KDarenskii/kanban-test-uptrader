import { useCallback, useState } from "react";

import { v4 as generateId } from "uuid";

import { selectTasksByProjectId } from "store/tasks/selectors";

import useTypedDispatch from "hooks/shared/useTypedDispatch";
import useTypedSelector from "hooks/shared/useTypedSelector";

import { ISubtask, ITask } from "types/task.interface";

import { AddTaskFormState } from "./AddTaskForm/AddTaskForm";

const useAddTaskModal = (projectId: string) => {
    const [isActive, setIsActive] = useState(false);
    const tasks = useTypedSelector((state) =>
        selectTasksByProjectId(state, projectId),
    );
    const dispatch = useTypedDispatch();

    const handleAddTask = useCallback(
        (data: AddTaskFormState) => {
            const title = data.title.trim();
            const description = data.description.trim();
            const subtasks = data.subtasks;

            const newSubtasks: ISubtask[] = subtasks
                .filter((subtask) => subtask.title.trim().length > 0)
                .map((subtask) => ({
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
                status: data.status,
                subtasks: newSubtasks,
                file: data.file
                    ? { name: data.file.name, blob: new Blob([data.file]) }
                    : null,
                createdAt: new Date(),
                number: tasks.length + 1,
                priority: data.priority,
                finishDate: data.finishDate,
            };

            dispatch({ type: "ADD_TASK", payload: newTask });

            setIsActive(false);
        },
        [dispatch, projectId, tasks.length],
    );

    const handleClose = () => setIsActive(false);

    const handleOpen = () => setIsActive(true);

    return { isActive, handleAddTask, handleClose, handleOpen };
};

export default useAddTaskModal;
