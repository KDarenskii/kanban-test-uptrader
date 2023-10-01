import { FC } from "react";

import cn from "clsx";
import { Link } from "react-router-dom";

import { selectFilteredTasks } from "store/tasks/selectors";

import useTypedSelector from "hooks/shared/useTypedSelector";

import { BOARD_PATH } from "constants/routes";

import "./projectCard.scss";

interface Props {
    id: string;
    title: string;
    description: string;
    className?: string;
}

const ProjectCard: FC<Props> = ({ id, title, className, description }) => {
    const { developingTasks, doneTasks, queueTasks } = useTypedSelector(
        (state) => selectFilteredTasks(state, id),
    );
    const totalTasksCount =
        developingTasks.length + doneTasks.length + queueTasks.length;

    const completenessPercents = Math.floor(
        (doneTasks.length / totalTasksCount) * 100,
    );

    return (
        <Link
            className={cn("project-card", className)}
            to={`${BOARD_PATH}/${id}`}
        >
            <h3 className="project-card__title">{title}</h3>
            <p className="project-card__description">{description}</p>
            <div className="project-card__completeness">
                <p className="project-card__completeness-stat">
                    Done: {doneTasks.length} of {totalTasksCount} tasks
                </p>
                <div className="project-card__completeness-range" />
                <div
                    className="project-card__completeness-percents"
                    style={{ width: `${completenessPercents}%` }}
                />
            </div>
        </Link>
    );
};

export default ProjectCard;
