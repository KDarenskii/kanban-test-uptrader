import { FC, InputHTMLAttributes } from "react";

import cn from "clsx";
import { BsCheckLg } from "react-icons/bs";

import "./checkbox.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: FC<Props> = ({ checked, className, ...rest }) => {
    return (
        <>
            <input type="checkbox" className="visually-hidden" {...rest} />
            <span
                className={cn(
                    "checkbox",
                    checked && "checkbox--checked",
                    className,
                )}
            >
                {checked && <BsCheckLg className="checkbox__checked-icon" />}
            </span>
        </>
    );
};

export default Checkbox;
