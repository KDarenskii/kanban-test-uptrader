import { InputHTMLAttributes, forwardRef } from "react";

import cn from "clsx";

import "./input.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(
    ({ className, ...rest }, ref) => {
        return (
            <input
                className={cn("input", className)}
                autoComplete="none"
                {...rest}
                ref={ref}
            />
        );
    },
);

export default Input;
