import { FC } from "react";

import { ModalBody, ModalHeader, ModalRoot } from "components/shared/Modal";
import { ActionButton } from "components/ui/ActionButton";

import { AddTaskForm } from "./AddTaskForm";
import "./addTaskModal.scss";
import useAddTaskModal from "./useAddTaskModal";

interface Props {
    projectId: string;
}

const AddTaskModal: FC<Props> = ({ projectId }) => {
    const { handleAddTask, handleClose, handleOpen, isActive } =
        useAddTaskModal(projectId);

    return (
        <>
            <ActionButton onClick={handleOpen}>+ Add Task</ActionButton>
            <ModalRoot isActive={isActive} onClose={handleClose}>
                <ModalBody>
                    <ModalHeader
                        className="add-task-modal-header"
                        title="Add new task"
                        onClose={handleClose}
                    />
                    <AddTaskForm onSubmit={handleAddTask} />
                </ModalBody>
            </ModalRoot>
        </>
    );
};

export default AddTaskModal;
