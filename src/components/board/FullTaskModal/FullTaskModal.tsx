import { FC } from "react";

import cn from "clsx";
import { formatDistanceToNow } from "date-fns";

import { ModalBody, ModalHeader, ModalRoot } from "components/shared/Modal";
import { Checkbox, CheckboxLabelGroup } from "components/ui/Checkbox";

import { ISubtask } from "types/task.interface";

import "./fullTaskModal.scss";
import useFullModal from "./useFullModal";

const FullTaskModal: FC = () => {
    const { task, handleClose, handleChangeCompleteStatus, isActive } =
        useFullModal();

    if (!task) return null;

    const {
        description,
        subtasks,
        title,
        status,
        file,
        createdAt,
        finishDate,
        priority,
    } = task;

    const formattedCreatedAtDate = new Date(createdAt).toLocaleDateString();
    const formattedFinishDate = new Date(finishDate).toLocaleDateString();

    return (
        <ModalRoot
            className="full-task-modal"
            isActive={isActive}
            onClose={handleClose}
        >
            <ModalBody>
                <ModalHeader
                    className="full-task-modal__header"
                    title={title}
                    onClose={handleClose}
                />
                <p className="full-task-modal__text">{description}</p>
                <Subtasks
                    subtasks={subtasks}
                    handleChange={handleChangeCompleteStatus}
                />
                <Subsection title="Status" text={status} uppercase={true} />
                <Subsection title="Priority" text={priority} uppercase={true} />
                <Files file={file} />
                <Subsection title="Created at" text={formattedCreatedAtDate} />
                <Subsection title="Finish at" text={formattedFinishDate} />
                <Subsection
                    title="Time in work"
                    text={formatDistanceToNow(new Date(createdAt))}
                />
            </ModalBody>
        </ModalRoot>
    );
};

export default FullTaskModal;

function Subsection({
    text,
    title,
    uppercase,
}: {
    title: string;
    text: string;
    uppercase?: boolean;
}) {
    return (
        <div className="full-task-modal__subsection">
            <h6 className="full-task-modal__subtitle">{title}</h6>
            <p
                className={cn(
                    "full-task-modal__text",
                    uppercase && "full-task-modal__text--uppercase",
                )}
            >
                {text}
            </p>
        </div>
    );
}

function Subtasks({
    subtasks,
    handleChange,
}: {
    subtasks: ISubtask[];
    handleChange: (id: string) => void;
}) {
    const completedSubtasksCount = subtasks.reduce((counter, subtask) => {
        return subtask.isCompleted ? counter + 1 : counter;
    }, 0);

    return (
        <div className="full-task-modal__subsection">
            <h6 className="full-task-modal__subtitle">
                Subtasks ({completedSubtasksCount} of {subtasks.length})
            </h6>
            <ul className="full-task-modal__subtasks">
                {subtasks.map(({ id, isCompleted, title }) => {
                    return (
                        <li className="full-task-modal__subtasks-item" key={id}>
                            <CheckboxLabelGroup>
                                <Checkbox
                                    checked={isCompleted}
                                    onChange={() => handleChange(id)}
                                />
                                <p
                                    className={cn(
                                        "full-task-modal__subtask-text",
                                        isCompleted &&
                                            "full-task-modal__subtask-text--completed",
                                    )}
                                >
                                    {title}
                                </p>
                            </CheckboxLabelGroup>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function Files({
    file,
}: {
    file: {
        name: string;
        blob: Blob;
    } | null;
}) {
    if (file === null) return null;

    return <Subsection title="Files" text={file.name} />;
}
