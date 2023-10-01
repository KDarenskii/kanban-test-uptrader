import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import "./checkboxLabelGroup.scss";

interface Props {
    className?: string;
}

const CheckboxLabelGroup: FC<PropsWithChildren<Props>> = ({
    children,
    className,
}) => {
    return (
        <label className={cn("checkbox-label-group", className)}>
            {children}
        </label>
    );
};

export default CheckboxLabelGroup;
