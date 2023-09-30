import { DragEvent, FC } from "react";

import cn from "clsx";
import { TbAlignBoxLeftMiddle } from "react-icons/tb";

import { ITask } from "types/task.interface";

import { TaskStatuses } from "constants/taskStatuses";

import { TaskCard } from "../TaskCard";
import { IList } from "../Tasks";
import "./boardColumn.scss";

interface Props {
    tasks: ITask[];
    title: string;
    status: TaskStatuses;
    onDragStart: (
        event: DragEvent<HTMLElement>,
        list: IList,
        task: ITask,
    ) => void;
    onDragEnd: (event: DragEvent<HTMLElement>) => void;
    onDragOver: (event: DragEvent<HTMLElement>) => void;
    onDragLeave: (event: DragEvent<HTMLElement>) => void;
    onListDragLeave: (event: DragEvent<HTMLElement>) => void;
    onListDrop: (event: DragEvent<HTMLUListElement>, listToDrop: IList) => void;
    onListDragOver: (
        event: DragEvent<HTMLUListElement>,
        length: number,
    ) => void;
    className?: string;
}

const BoardColumn: FC<Props> = ({
    className,
    status,
    tasks,
    title,
    onDragEnd,
    onDragLeave,
    onDragOver,
    onDragStart,
    onListDragLeave,
    onListDragOver,
    onListDrop,
}) => {
    const hasTasks = tasks.length > 0;

    return (
        <div className={cn("board-column", className)}>
            <h4 className="board-column__title">{title}</h4>
            <ul
                className="board-column__list"
                data-list={status}
                onDragOver={(event) => onListDragOver(event, tasks.length)}
                onDragLeave={onListDragLeave}
                onDrop={(event) => onListDrop(event, { tasks, status })}
            >
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        list={{ status, tasks }}
                        task={task}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                    />
                ))}
                {!hasTasks && <EmptyColumn />}
            </ul>
        </div>
    );
};

export default BoardColumn;

function EmptyColumn() {
    return (
        <div className="empty-column-board">
            <TbAlignBoxLeftMiddle className="empty-column-board__icon" />
            <p className="empty-column-board__text">There are no tasks yet.</p>
        </div>
    );
}
