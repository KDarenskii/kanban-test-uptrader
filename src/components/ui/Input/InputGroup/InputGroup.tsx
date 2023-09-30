import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import "./inputGroup.scss";

interface Props {
    className?: string;
}

const InputGroup: FC<PropsWithChildren<Props>> = ({ children, className }) => {
    return <div className={cn("input-group", className)}>{children}</div>;
};

export default InputGroup;
