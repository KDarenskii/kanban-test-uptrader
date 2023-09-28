import { FC, useState } from "react";

import { ModalBody, ModalHeader, ModalRoot } from "components/shared/Modal";
import { ActionButton } from "components/ui/ActionButton";

import { AddProjectForm } from "./AddProjectForm";
import "./addProjectModal.scss";

interface Props {}

const AddProjectModal: FC<Props> = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <ActionButton onClick={() => setIsActive(true)}>
                + Add New Project
            </ActionButton>
            <ModalRoot isActive={isActive} onClose={() => setIsActive(false)}>
                <ModalBody>
                    <ModalHeader
                        className="add-project-modal-header"
                        title="Add new project"
                        onClose={() => setIsActive(false)}
                    />
                    <AddProjectForm />
                </ModalBody>
            </ModalRoot>
        </>
    );
};

export default AddProjectModal;
