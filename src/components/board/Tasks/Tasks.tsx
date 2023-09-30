import { FC } from "react";

import { Container } from "components/shared/Container";

import { selectFilteredTasks } from "store/tasks/selectors";

import useTypedSelector from "hooks/shared/useTypedSelector";

import { TaskStatuses } from "constants/taskStatuses";

import { BoardColumn } from "../BoardColumn";
import "./tasks.scss";
import useTasks from "./useTasks";

interface Props {
    projectId: string;
}

const Tasks: FC<Props> = ({ projectId }) => {
    const filteredTasks = useTypedSelector((state) =>
        selectFilteredTasks(state, projectId),
    );

    const columns = [
        {
            status: TaskStatuses.QUEUE,
            title: "QUEUE",
            tasks: filteredTasks.queueTasks,
        },
        {
            status: TaskStatuses.DEVELOPING,
            title: "DEVELOPING",
            tasks: filteredTasks.developingTasks,
        },
        {
            status: TaskStatuses.DONE,
            title: "DONE",
            tasks: filteredTasks.doneTasks,
        },
    ];

    const {
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDragLeave,
        handleListDragOver,
        handleListDragLeave,
        handleListDrop,
    } = useTasks();

    return (
        <section className="tasks">
            <h2 className="visually-hidden">Tasks</h2>
            <Container fullHeight={true}>
                <div className="tasks__wrapper">
                    {columns.map(({ status, title, tasks }) => (
                        <BoardColumn
                            key={status}
                            status={status}
                            tasks={tasks}
                            title={title}
                            onListDrop={handleListDrop}
                            onListDragOver={handleListDragOver}
                            onListDragLeave={handleListDragLeave}
                            onDragEnd={handleDragEnd}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDragStart={handleDragStart}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Tasks;
