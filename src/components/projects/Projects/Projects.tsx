import { FC } from "react";

import { Container } from "components/shared/Container";

import { selectProjects } from "store/projects/selectors";

import useTypedSelector from "hooks/shared/useTypedSelector";

import { ProjectCard } from "../ProjectCard";
import "./projects.scss";

const Projects: FC = () => {
    const projectsList = useTypedSelector(selectProjects);

    return (
        <section className="projects">
            <Container>
                <h1 className="projects__title">Your projects</h1>
                <ul className="projects__list">
                    {projectsList.map((project) => {
                        return (
                            <li key={project.id}>
                                <ProjectCard
                                    id={project.id}
                                    title={project.title}
                                    description={project.description}
                                />
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </section>
    );
};

export default Projects;
