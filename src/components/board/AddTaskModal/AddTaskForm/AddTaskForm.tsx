import { FC, useImperativeHandle } from "react";

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
import { Textarea } from "components/ui/Textarea";

import useFocus from "hooks/shared/useFocus";

import { formErrors } from "constants/formErrors";

import "./addTaskForm.scss";

export interface AddTaskFormState {
    title: string;
    description: string;
    subtasks: { title: string }[];
    files: File | null;
}

interface FieldProps {
    register: UseFormRegister<AddTaskFormState>;
    error?: FieldErrorType;
    control?: Control<AddTaskFormState>;
}

interface FormProps {
    onSubmit: (data: AddTaskFormState) => void;
}

const defaultValues: AddTaskFormState = {
    title: "",
    description: "",
    subtasks: [{ title: "" }, { title: "" }],
    files: null,
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
            <ActionButton className="add-task-form__btn" type="submit">
                Create project
            </ActionButton>
        </form>
    );
};

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
                name="files"
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

export default AddTaskForm;
