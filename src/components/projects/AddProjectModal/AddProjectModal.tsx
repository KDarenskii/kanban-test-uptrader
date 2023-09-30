import { FC } from "react";

import { ModalBody, ModalHeader, ModalRoot } from "components/shared/Modal";
import { ActionButton } from "components/ui/ActionButton";

import { AddProjectForm } from "./AddProjectForm";
import "./addProjectModal.scss";
import useAddProjectModal from "./useAddProjectModal";

const AddProjectModal: FC = () => {
    const { handleAddProject, handleClose, handleOpen, isActive } =
        useAddProjectModal();

    return (
        <>
            <ActionButton onClick={handleOpen}>+ Add New Project</ActionButton>
            <ModalRoot isActive={isActive} onClose={handleClose}>
                <ModalBody>
                    <ModalHeader
                        className="add-project-modal-header"
                        title="Add new project"
                        onClose={handleClose}
                    />
                    <AddProjectForm onSubmit={handleAddProject} />
                </ModalBody>
            </ModalRoot>
        </>
    );
};

export default AddProjectModal;
