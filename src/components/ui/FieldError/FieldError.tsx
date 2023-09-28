import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import "./fieldError.scss";

interface Props {
    className?: string;
}

const FieldError: FC<PropsWithChildren<Props>> = ({ children, className }) => {
    return (
        <p className={cn("field-error", className)} role="alert">
            {children}
        </p>
    );
};

export default FieldError;
