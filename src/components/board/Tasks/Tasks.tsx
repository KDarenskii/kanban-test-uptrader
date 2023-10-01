import { FC } from "react";

import { Container } from "components/shared/Container";

import { BoardColumn } from "../BoardColumn";
import { FullTaskModal } from "../FullTaskModal";
import "./tasks.scss";
import useTasks from "./useTasks";

interface Props {
    projectId: string;
}

const Tasks: FC<Props> = ({ projectId }) => {
    const {
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDragLeave,
        handleListDragOver,
        handleListDragLeave,
        handleOpenFullTaskModal,
        handleListDrop,
        handleDragDrop,
        columns,
    } = useTasks(projectId);

    return (
        <>
            <FullTaskModal />
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
                                onTaskClick={handleOpenFullTaskModal}
                                onTaskDragDrop={handleDragDrop}
                            />
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Tasks;
