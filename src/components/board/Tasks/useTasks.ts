import { DragEvent, useState } from "react";

import useTypedDispatch from "hooks/shared/useTypedDispatch";

import { ITask } from "types/task.interface";

import { TaskStatuses } from "constants/taskStatuses";

const TASK_DATA_ATTRIBUTE_NAME = "[data-task]";
const LIST_DATA_ATTRIBUTE_NAME = "[data-list]";
const GRABBING_CLASS_NAME = "task-card--grabbing";
const SHADOW_TOP_CLASS_NAME = "task-card--shadow-top";
const SHADOW_BOTTOM_CLASS_NAME = "task-card--shadow-bottom";
const BORDER_COLORED_CLASS_NAME = "board-column__list--border-colored";

export interface IList {
    status: TaskStatuses;
    tasks: ITask[];
}

const useTasks = () => {
    const dispatch = useTypedDispatch();

    const [currentList, setCurrentList] = useState<IList | null>(null);
    const [currentTask, setCurrentTask] = useState<ITask | null>(null);

    const handleDragStart = (
        event: DragEvent<HTMLElement>,
        list: IList,
        task: ITask,
    ) => {
        const target = event.currentTarget;
        target.classList.add(GRABBING_CLASS_NAME);

        setCurrentList(list);
        setCurrentTask(task);
    };

    const handleDragEnd = (event: DragEvent<HTMLElement>) => {
        const target = event.currentTarget;
        const taskElement = target.closest(TASK_DATA_ATTRIBUTE_NAME);
        if (taskElement) {
            taskElement.classList.remove(GRABBING_CLASS_NAME);
        }
    };

    const handleDragOver = (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const taskElement = target.closest(
            TASK_DATA_ATTRIBUTE_NAME,
        ) as HTMLElement;
        if (taskElement && taskElement.dataset.task !== currentTask?.id) {
            if (event.nativeEvent.offsetY < taskElement.offsetHeight / 2) {
                taskElement.classList.remove(SHADOW_BOTTOM_CLASS_NAME);
                taskElement.classList.add(SHADOW_TOP_CLASS_NAME);
            } else {
                taskElement.classList.remove(SHADOW_TOP_CLASS_NAME);
                taskElement.classList.add(SHADOW_BOTTOM_CLASS_NAME);
            }
        }
    };

    const handleDragLeave = (event: DragEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const taskElement = target.closest(TASK_DATA_ATTRIBUTE_NAME);
        if (taskElement)
            taskElement.classList.remove(
                SHADOW_BOTTOM_CLASS_NAME,
                SHADOW_TOP_CLASS_NAME,
            );
    };

    const handleListDragOver = (
        event: DragEvent<HTMLUListElement>,
        length: number,
    ) => {
        event.preventDefault();

        const target = event.target as HTMLElement;
        const listElement = target.closest(LIST_DATA_ATTRIBUTE_NAME);

        if (
            length < 1 &&
            listElement &&
            event.currentTarget.dataset.list !== currentList?.status
        ) {
            listElement.classList.add(BORDER_COLORED_CLASS_NAME);
        }
    };

    const handleListDragLeave = (event: DragEvent) => {
        const target = event.target as HTMLElement;
        const listElement = target.closest(LIST_DATA_ATTRIBUTE_NAME);
        if (listElement) {
            listElement.classList.remove(BORDER_COLORED_CLASS_NAME);
        }
    };

    const handleListDrop = (
        event: DragEvent<HTMLUListElement>,
        listToDrop: IList,
    ) => {
        event.preventDefault();
        const targetClassList = event.currentTarget.classList;
        if (listToDrop.tasks.length > 0 || !currentTask || !currentList) return;

        targetClassList.remove(BORDER_COLORED_CLASS_NAME);

        const updatedTask: ITask = {
            ...currentTask,
            status: listToDrop.status,
        };

        dispatch({ type: "UPDATE_TASK", payload: updatedTask });
    };

    return {
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDragLeave,
        handleListDragOver,
        handleListDragLeave,
        handleListDrop,
    };
};

export default useTasks;
