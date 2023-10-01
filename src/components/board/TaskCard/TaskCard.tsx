import { DragEvent, FC } from "react";

import cn from "clsx";

import { ITask } from "types/task.interface";

import { TaskStatuses } from "constants/taskStatuses";

import { IList } from "../Tasks";
import "./taskCard.scss";

interface Props {
    task: ITask;
    list: IList;
    onDragStart: (
        event: DragEvent<HTMLElement>,
        list: IList,
        task: ITask,
    ) => void;
    onDragEnd: (event: DragEvent<HTMLElement>) => void;
    onDragOver: (event: DragEvent<HTMLElement>) => void;
    onDragLeave: (event: DragEvent<HTMLElement>) => void;
    onDragDrop: (
        event: DragEvent<HTMLElement>,
        targetTaskId: string,
        dropOnListStatus: TaskStatuses,
    ) => void;
    className?: string;
    onClick?: (task: ITask) => void;
}

const TaskCard: FC<Props> = ({
    task,
    className,
    onClick,
    list,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragLeave,
    onDragDrop,
}) => {
    return (
        <article
            data-task={task.id}
            className={cn("task-card", className)}
            onClick={() => onClick?.(task)}
            onDragStart={(event) => onDragStart(event, list, task)}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={(event) => onDragDrop(event, task.id, list.status)}
            draggable={true}
        >
            <h6 className="task-card__title">{task.title}</h6>
            <p className="task-card__completeness">1 of 2 subtasks</p>
        </article>
    );
};

export default TaskCard;
