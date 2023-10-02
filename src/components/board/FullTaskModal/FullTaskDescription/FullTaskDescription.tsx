import { FC } from "react";

import cn from "clsx";
import { formatDistanceToNow } from "date-fns";

import { ActionButton } from "components/ui/ActionButton";
import { Checkbox, CheckboxLabelGroup } from "components/ui/Checkbox";

import { ISubtask, ITask } from "types/task.interface";

import "./fullTaskDescription.scss";

interface Props {
    task: ITask;
    openEditing: () => void;
    changeSubtaskStatus: (id: string) => void;
}

const FullTaskDescription: FC<Props> = ({
    task,
    changeSubtaskStatus,
    openEditing,
}) => {
    const {
        description,
        subtasks,
        title,
        status,
        file,
        createdAt,
        finishDate,
        priority,
        number,
    } = task;

    const formattedCreatedAtDate = new Date(createdAt).toLocaleDateString();
    const formattedFinishDate = new Date(finishDate).toLocaleDateString();

    return (
        <div className="full-task-description">
            <h4 className="full-task-description__title">{`#${number} | ${title}`}</h4>
            <p className="full-task-description__text">{description}</p>
            <Subtasks subtasks={subtasks} handleChange={changeSubtaskStatus} />
            <Subsection title="Status" text={status} uppercase={true} />
            <Subsection title="Priority" text={priority} uppercase={true} />
            <Files file={file} />
            <Subsection title="Created at" text={formattedCreatedAtDate} />
            <Subsection title="Finish at" text={formattedFinishDate} />
            <Subsection
                title="Time in work"
                text={formatDistanceToNow(new Date(createdAt))}
            />
            <ActionButton
                className="full-task-description__btn"
                type="button"
                onClick={openEditing}
            >
                Edit
            </ActionButton>
        </div>
    );
};

export default FullTaskDescription;

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
        <div className="full-task-description__subsection">
            <h6 className="full-task-description__subtitle">{title}</h6>
            <p
                className={cn(
                    "full-task-description__text",
                    uppercase && "full-task-description__text--uppercase",
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
        <div className="full-task-description__subsection">
            <h6 className="full-task-description__subtitle">
                Subtasks ({completedSubtasksCount} of {subtasks.length})
            </h6>
            <ul className="full-task-description__subtasks">
                {subtasks.map(({ id, isCompleted, title }) => {
                    return (
                        <li
                            className="full-task-description__subtasks-item"
                            key={id}
                        >
                            <CheckboxLabelGroup>
                                <Checkbox
                                    checked={isCompleted}
                                    onChange={() => handleChange(id)}
                                />
                                <p
                                    className={cn(
                                        "full-task-description__subtask-text",
                                        isCompleted &&
                                            "full-task-description__subtask-text--completed",
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
