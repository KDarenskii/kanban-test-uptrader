import { FC, LabelHTMLAttributes } from "react";

import cn from "clsx";

import "./label.scss";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label: FC<Props> = ({ className, children, ...rest }) => {
    return (
        <label className={cn("label", className)} {...rest}>
            {children}
        </label>
    );
};

export default Label;
