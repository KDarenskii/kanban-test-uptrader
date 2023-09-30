import { RootState } from "store/types";

export const selectProjects = (state: RootState) =>
    state.projectsReducer.projects;
export const selectProjectById = (state: RootState, id: string) =>
    state.projectsReducer.projects.find((project) => project.id === id);
