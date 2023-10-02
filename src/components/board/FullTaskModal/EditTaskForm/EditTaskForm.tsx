import { FC, useImperativeHandle } from "react";

import {
    Control,
    FieldError as FieldErrorType,
    RegisterOptions,
    SubmitHandler,
    UseFormRegister,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { FaTimes } from "react-icons/fa";

import { ActionButton } from "components/ui/ActionButton";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { Input, InputGroup } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Option, Select } from "components/ui/Select";
import { Textarea } from "components/ui/Textarea";

import useFocus from "hooks/shared/useFocus";

import { ITask } from "types/task.interface";

import { formErrors } from "constants/formErrors";
import { TaskPriority } from "constants/taskPriority";
import { TaskStatuses } from "constants/taskStatuses";

import "./editTaskForm.scss";

export interface EditTaskFormState {
    title: string;
    description: string;
    subtasks: { title: string }[];
    priority: TaskPriority;
    status: TaskStatuses;
}

interface FieldProps {
    register: UseFormRegister<EditTaskFormState>;
    error?: FieldErrorType;
    control?: Control<EditTaskFormState>;
}

const statusOptions: Option<TaskStatuses>[] = [
    { value: TaskStatuses.QUEUE, label: "Queue" },
    { value: TaskStatuses.DEVELOPING, label: "Developing" },
    { value: TaskStatuses.DONE, label: "Done" },
];

const priorityOptions: Option<TaskPriority>[] = [
    { value: TaskPriority.TRIVIAL, label: "Trivial" },
    { value: TaskPriority.MINOR, label: "Minor" },
    { value: TaskPriority.MAJOR, label: "Major" },
];

interface FormProps {
    task: ITask;
    onSubmit: (data: EditTaskFormState) => void;
    closeEditing: () => void;
}

const EditTaskForm: FC<FormProps> = ({ task, onSubmit, closeEditing }) => {
    const { description, title, status, priority, subtasks } = task;
    const {
        register,
        handleSubmit: submitHandlerWrapper,
        reset,
        control,
        formState: { errors },
    } = useForm<EditTaskFormState>({
        defaultValues: {
            description,
            priority,
            status,
            subtasks,
            title,
        },
    });

    const handleSubmit: SubmitHandler<EditTaskFormState> = (data) => {
        onSubmit(data);
        reset();
    };

    const handleBackButtonClick = () => {
        closeEditing();
        reset();
    };

    return (
        <form
            className="edit-task-form"
            onSubmit={submitHandlerWrapper(handleSubmit)}
        >
            <Title register={register} error={errors.title} />
            <Description register={register} error={errors.description} />
            <Subtasks control={control} register={register} />
            <Status register={register} />
            <Priority register={register} />
            <ActionButton className="edit-task-form__btn" type="submit">
                Save
            </ActionButton>
            <ActionButton
                className="edit-task-form__btn"
                type="button"
                variant="light"
                onClick={handleBackButtonClick}
            >
                Go Back
            </ActionButton>
        </form>
    );
};

export default EditTaskForm;

function Title({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 35;

    const titleRef = useFocus<HTMLInputElement>();

    const { ref, ...rest } = register("title", {
        required: formErrors.required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: formErrors.maxLengthLimit(LENGTH_LIMIT),
        },
    });

    useImperativeHandle(ref, () => titleRef.current);

    return (
        <FieldGroup className="edit-task-form__group">
            <Label htmlFor="edit-task-form-title">Title</Label>
            <Input
                className="edit-task-form__input"
                {...rest}
                placeholder="e.g. Information System"
                id="edit-task-form-title"
                type="text"
                ref={titleRef}
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Description({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 60;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<EditTaskFormState, "description"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className="edit-task-form__group">
            <Label htmlFor="edit-task-form-description">Description</Label>
            <Textarea
                className="edit-task-form__input"
                {...register("description", fieldOptions)}
                placeholder="e.g. Modern application that allows..."
                id="edit-task-form-description"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Subtasks({ register, control }: FieldProps) {
    const { fields, remove, append } = useFieldArray({
        name: "subtasks",
        control,
    });

    return (
        <FieldGroup className="edit-task-form__group">
            <Label htmlFor="edit-task-form-subtask">Subtasks</Label>
            {fields.map((field, index) => (
                <InputGroup
                    className="edit-task-form__input-group"
                    key={field.id}
                >
                    <Input
                        className="edit-task-form__input"
                        id={index === 0 ? "edit-task-form-subtask" : undefined}
                        placeholder={
                            index % 2
                                ? "e.g. Make coffee"
                                : "e.g. Drink coffee & smile"
                        }
                        {...register(`subtasks.${index}.title` as const)}
                    />
                    <FaTimes
                        className="edit-task-form__input-icon"
                        onClick={() => remove(index)}
                    />
                </InputGroup>
            ))}
            <ActionButton
                className="edit-task-form__btn"
                variant="light"
                onClick={() => append({ title: "" })}
                type="button"
            >
                + Add new subtask
            </ActionButton>
        </FieldGroup>
    );
}

function Status({ register }: FieldProps) {
    return (
        <FieldGroup className="edit-task-form__group">
            <Label htmlFor="edit-task-form-status">Status</Label>
            <Select {...register("status")} id="edit-task-form-status">
                {statusOptions.map(({ label, value }) => (
                    <option value={value} key={value}>
                        {label}
                    </option>
                ))}
            </Select>
        </FieldGroup>
    );
}

function Priority({ register }: FieldProps) {
    return (
        <FieldGroup className="edit-task-form__group">
            <Label htmlFor="edit-task-form-priority">Priority</Label>
            <Select {...register("priority")} id="edit-task-form-priority">
                {priorityOptions.map(({ label, value }) => (
                    <option value={value} key={value}>
                        {label}
                    </option>
                ))}
            </Select>
        </FieldGroup>
    );
}
