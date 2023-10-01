import { FC, useImperativeHandle } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Control,
    Controller,
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

import { formErrors } from "constants/formErrors";
import { TaskPriority } from "constants/taskPriority";
import { TaskStatuses } from "constants/taskStatuses";

import "./addTaskForm.scss";

export interface AddTaskFormState {
    title: string;
    description: string;
    subtasks: { title: string }[];
    file: File | null;
    finishDate: Date;
    priority: TaskPriority;
    status: TaskStatuses;
}

interface FieldProps {
    register: UseFormRegister<AddTaskFormState>;
    error?: FieldErrorType;
    control?: Control<AddTaskFormState>;
}

interface FormProps {
    onSubmit: (data: AddTaskFormState) => void;
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

const defaultValues: AddTaskFormState = {
    title: "",
    description: "",
    subtasks: [{ title: "" }, { title: "" }],
    file: null,
    finishDate: new Date(),
    priority: priorityOptions[0].value,
    status: statusOptions[0].value,
};

const AddTaskForm: FC<FormProps> = ({ onSubmit }) => {
    const {
        handleSubmit: submitHandlerWrapper,
        register,
        reset,
        control,
        formState: { errors },
    } = useForm<AddTaskFormState>({ defaultValues });

    const handleSubmit: SubmitHandler<AddTaskFormState> = (data) => {
        console.log(data);
        onSubmit(data);
        reset();
    };

    return (
        <form
            className="add-project-form"
            onSubmit={submitHandlerWrapper(handleSubmit)}
        >
            <Title register={register} error={errors.title} />
            <Description register={register} error={errors.description} />
            <Subtasks control={control} register={register} />
            <Files control={control} register={register} />
            <Status register={register} />
            <Priority register={register} />
            <FinishDate register={register} control={control} />
            <ActionButton className="add-task-form__btn" type="submit">
                Create task
            </ActionButton>
        </form>
    );
};

export default AddTaskForm;

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
        <FieldGroup className="add-task-form__group">
            <Label htmlFor="add-task-form-title">Title</Label>
            <Input
                className="add-task-form__input"
                {...rest}
                placeholder="e.g. Information System"
                id="add-task-form-title"
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

    const fieldOptions: RegisterOptions<AddTaskFormState, "description"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className="add-task-form__group">
            <Label htmlFor="add-task-form-description">Description</Label>
            <Textarea
                className="add-task-form__input"
                {...register("description", fieldOptions)}
                placeholder="e.g. Modern application that allows..."
                id="add-task-form-description"
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
        <FieldGroup className="add-task-form__group">
            <Label htmlFor="add-task-form-subtask">Subtasks</Label>
            {fields.map((field, index) => (
                <InputGroup
                    className="add-task-form__input-group"
                    key={field.id}
                >
                    <Input
                        className="add-task-form__input"
                        id={index === 0 ? "add-task-form-subtask" : undefined}
                        placeholder={
                            index % 2
                                ? "e.g. Make coffee"
                                : "e.g. Drink coffee & smile"
                        }
                        {...register(`subtasks.${index}.title` as const)}
                    />
                    <FaTimes
                        className="add-task-form__input-icon"
                        onClick={() => remove(index)}
                    />
                </InputGroup>
            ))}
            <ActionButton
                className="add-task-form__btn"
                variant="light"
                onClick={() => append({ title: "" })}
                type="button"
            >
                + Add new subtask
            </ActionButton>
        </FieldGroup>
    );
}

function Files({ control }: FieldProps) {
    return (
        <FieldGroup className="add-task-form__group">
            <Label htmlFor="add-task-form-file">Files</Label>
            <Controller
                name="file"
                control={control}
                render={({ field: { value, onChange, ...field } }) => {
                    return (
                        <Input
                            {...field}
                            className="add-task-form__input"
                            onChange={(event) =>
                                onChange(event.target.files?.[0])
                            }
                            type="file"
                            id="add-task-form-file"
                        />
                    );
                }}
            />
        </FieldGroup>
    );
}

function Status({ register }: FieldProps) {
    return (
        <FieldGroup className="add-task-form__group">
            <Label htmlFor="add-task-form-status">Status</Label>
            <Select {...register("status")} id="add-task-form-status">
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
        <FieldGroup className="add-task-form__group">
            <Label htmlFor="add-task-form-priority">Priority</Label>
            <Select {...register("priority")} id="add-task-form-priority">
                {priorityOptions.map(({ label, value }) => (
                    <option value={value} key={value}>
                        {label}
                    </option>
                ))}
            </Select>
        </FieldGroup>
    );
}

function FinishDate({ control }: FieldProps) {
    return (
        <FieldGroup className="add-task-form__group">
            <Label htmlFor="add-task-form-date">Finish date</Label>
            <Controller
                name="finishDate"
                control={control}
                render={({ field: { value, onChange, ...field } }) => {
                    return (
                        <DatePicker
                            {...field}
                            selected={value}
                            onChange={(date) => onChange(date)}
                            id="add-task-form-date"
                            className="add-task-form__date-input"
                            wrapperClassName="add-task-form__date-wrapper"
                        />
                    );
                }}
            />
        </FieldGroup>
    );
}
