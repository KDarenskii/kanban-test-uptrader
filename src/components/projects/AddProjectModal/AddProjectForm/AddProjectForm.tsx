import { FC, useImperativeHandle } from "react";

import cn from "clsx";
import {
    FieldError as FieldErrorType,
    RegisterOptions,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from "react-hook-form";

import { ActionButton } from "components/ui/ActionButton";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Textarea } from "components/ui/Textarea";

import useFocus from "hooks/shared/useFocus";

import { formErrors } from "constants/formErrors";

import "./addProjectForm.scss";

export interface ProjectFormState {
    title: string;
    description: string;
}

interface FieldProps {
    register: UseFormRegister<ProjectFormState>;
    error?: FieldErrorType;
}

interface FormProps {
    onSubmit: (data: ProjectFormState) => void;
    className?: string;
}

const defaultValues: ProjectFormState = {
    description: "",
    title: "",
};

const AddProjectForm: FC<FormProps> = ({ onSubmit, className }) => {
    const {
        handleSubmit: submitHandlerWrapper,
        register,
        reset,
        formState: { errors },
    } = useForm<ProjectFormState>({ defaultValues });

    const handleSubmit: SubmitHandler<ProjectFormState> = (data) => {
        onSubmit(data);
        reset();
    };

    return (
        <form
            className={cn("add-project-form", className)}
            onSubmit={submitHandlerWrapper(handleSubmit)}
        >
            <Title register={register} error={errors.title} />
            <Description register={register} error={errors.description} />
            <ActionButton className="add-project-form__btn" type="submit">
                Create project
            </ActionButton>
        </form>
    );
};

export default AddProjectForm;

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
        <FieldGroup className="add-project-form__group">
            <Label htmlFor="add-project-form-title">Title</Label>
            <Input
                className="add-project-form__input"
                {...rest}
                placeholder="e.g. Information System"
                id="add-project-form-title"
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

    const fieldOptions: RegisterOptions<ProjectFormState, "description"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className="add-project-form__group">
            <Label htmlFor="add-project-form-description">Description</Label>
            <Textarea
                className="add-project-form__input"
                {...register("description", fieldOptions)}
                placeholder="e.g. Modern application that allows..."
                id="add-project-form-description"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
