import { useCallback, useState } from "react";

import { v4 as generateId } from "uuid";

import useTypedDispatch from "hooks/shared/useTypedDispatch";

import { IProject } from "types/project.interface";

import { ProjectFormState } from "./AddProjectForm";

const useAppProjectModal = () => {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useTypedDispatch();

    const handleAddProject = useCallback(
        (data: ProjectFormState) => {
            const title = data.title.trim();
            const description = data.description.trim();

            if (!title || !description) {
                return;
            }

            const newProject: IProject = {
                description,
                title,
                id: generateId(),
            };

            dispatch({ type: "ADD_PROJECT", payload: newProject });

            setIsActive(false);
        },
        [dispatch],
    );

    const handleClose = () => setIsActive(false);

    const handleOpen = () => setIsActive(true);

    return { isActive, handleAddProject, handleClose, handleOpen };
};

export default useAppProjectModal;
