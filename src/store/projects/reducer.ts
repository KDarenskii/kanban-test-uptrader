import { IProject } from "types/project.interface";

import { ACTIONS, ProjectsActionsTypes } from "./actions";

interface ProjectsState {
    projects: IProject[];
}

const initialState: ProjectsState = {
    projects: [],
};

const projectsReducer = (
    state: ProjectsState = initialState,
    action: ProjectsActionsTypes,
): ProjectsState => {
    switch (action.type) {
        case ACTIONS.ADD_PROJECT:
            return {
                ...state,
                projects: state.projects.concat(action.payload),
            };
        case ACTIONS.DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(
                    (project) => project.id !== action.payload,
                ),
            };
        default:
            return state;
    }
};

export default projectsReducer;
