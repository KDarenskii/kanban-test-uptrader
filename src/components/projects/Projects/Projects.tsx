import { FC } from "react";

import { Container } from "components/shared/Container";

import { ProjectCard } from "../ProjectCard";
import "./projects.scss";

interface Props {}

const Projects: FC<Props> = () => {
    return (
        <section className="projects">
            <Container>
                <h1 className="projects__title">Your projects</h1>
                <ul className="projects__list">
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                    <li>
                        <ProjectCard
                            id="123"
                            title="Super project in this beatifull world"
                            description="The best project in the world"
                            completedTasksCount={2}
                            totalTasksCount={10}
                        />
                    </li>
                </ul>
            </Container>
        </section>
    );
};

export default Projects;
