import { SelectHTMLAttributes, forwardRef } from "react";

import cn from "clsx";

import "./select.scss";

export interface Option<V = string, L = string> {
    value: V;
    label: L;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, Props>(
    ({ children, className, ...rest }, ref) => {
        return (
            <select {...rest} ref={ref} className={cn("select", className)}>
                {children}
            </select>
        );
    },
);

export default Select;
