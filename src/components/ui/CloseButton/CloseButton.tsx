import { FC } from "react";

import cn from "clsx";
import { AiOutlineClose } from "react-icons/ai";

import "./closeButton.scss";

interface Props {
    onClick?: () => void;
    className?: string;
}

const CloseButton: FC<Props> = ({ className, onClick }) => {
    return (
        <button
            className={cn("close-button", className)}
            type="button"
            onClick={onClick}
        >
            <AiOutlineClose className="close-button__icon" />
        </button>
    );
};

export default CloseButton;
