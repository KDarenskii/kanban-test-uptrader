import { TextareaHTMLAttributes, forwardRef } from "react";

import cn from "clsx";

import "./textarea.scss";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
    ({ className, ...rest }, ref) => {
        return (
            <textarea
                className={cn("textarea", className)}
                {...rest}
                ref={ref}
            />
        );
    },
);

export default Textarea;
