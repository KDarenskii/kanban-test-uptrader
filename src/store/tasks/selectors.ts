import { createSelector } from "reselect";

import { RootState } from "store/types";

import { ITask } from "types/task.interface";

import { TaskStatuses } from "constants/taskStatuses";

interface FilteredTasks {
    queueTasks: ITask[];
    developingTasks: ITask[];
    doneTasks: ITask[];
}

export const selectTasks = (state: RootState) => state.tasksReducer.tasks;

export const selectTaskById = (state: RootState, id: string | null) => {
    if (id === null) return null;
    return state.tasksReducer.tasks.find((task) => task.id === id) ?? null;
};

export const selectTasksByProjectId = createSelector(
    [selectTasks, (_, projectId: string) => projectId],
    (tasks, projectId) => {
        return tasks.filter((task) => task.projectId === projectId);
    },
);

export const selectFilteredTasks = createSelector(
    [selectTasks, (_, projectId: string) => projectId],
    (tasks, projectId) => {
        const projectsTasks = tasks.filter(
            (task) => task.projectId === projectId,
        );
        const filteredTasks = projectsTasks.reduce<FilteredTasks>(
            (tasks, currTask) => {
                switch (currTask.status) {
                    case TaskStatuses.QUEUE:
                        tasks.queueTasks.push(currTask);
                        return tasks;
                    case TaskStatuses.DEVELOPING:
                        tasks.developingTasks.push(currTask);
                        return tasks;
                    case TaskStatuses.DONE:
                        tasks.doneTasks.push(currTask);
                        return tasks;
                    default:
                        return tasks;
                }
            },
            {
                queueTasks: [],
                developingTasks: [],
                doneTasks: [],
            },
        );

        return filteredTasks;
    },
);
