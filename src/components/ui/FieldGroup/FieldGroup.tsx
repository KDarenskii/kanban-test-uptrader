import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import "./fieldGroup.scss";

interface Props {
    className?: string;
}

const FieldGroup: FC<PropsWithChildren<Props>> = ({ children, className }) => {
    return <div className={cn("field-group", className)}>{children}</div>;
};

export default FieldGroup;
