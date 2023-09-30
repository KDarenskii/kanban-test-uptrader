import { PayloadAction } from "store/types";

import { IProject } from "types/project.interface";

export const ACTIONS = {
    ADD_PROJECT: "ADD_PROJECT",
    DELETE_PROJECT: "DELETE_PROJECT",
} as const;

type AddProjectAction = PayloadAction<typeof ACTIONS.ADD_PROJECT, IProject>;
type DeleteProjectAction = PayloadAction<typeof ACTIONS.DELETE_PROJECT, string>;

export type ProjectsActionsTypes = AddProjectAction | DeleteProjectAction;
