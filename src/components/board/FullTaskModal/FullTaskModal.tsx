import { FC } from "react";

import { ModalBody, ModalHeader, ModalRoot } from "components/shared/Modal";

import { EditTaskForm } from "./EditTaskForm";
import { FullTaskDescription } from "./FullTaskDescription";
import "./fullTaskModal.scss";
import useFullTaskModal from "./useFullTaskModal";

const FullTaskModal: FC = () => {
    const {
        task,
        isActive,
        isEditing,
        handleCloseModal,
        handleChangeCompleteStatus,
        handleCloseEditing,
        handleOpenEditing,
        handleSubmitEditing,
    } = useFullTaskModal();

    if (!task) return null;

    return (
        <ModalRoot
            className="full-task-modal"
            isActive={isActive}
            onClose={handleCloseModal}
        >
            <ModalBody>
                <ModalHeader
                    className="full-task-modal__header"
                    title={isEditing ? "Editing" : "Details"}
                    onClose={handleCloseModal}
                />
                {!isEditing && (
                    <FullTaskDescription
                        task={task}
                        changeSubtaskStatus={handleChangeCompleteStatus}
                        openEditing={handleOpenEditing}
                    />
                )}
                {isEditing && (
                    <EditTaskForm
                        task={task}
                        onSubmit={handleSubmitEditing}
                        closeEditing={handleCloseEditing}
                    />
                )}
            </ModalBody>
        </ModalRoot>
    );
};

export default FullTaskModal;
