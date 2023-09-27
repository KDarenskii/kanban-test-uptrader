import { ComponentProps, ElementType, ReactNode } from "react";

import cn from "clsx";

import "./actionButton.scss";

type ButtonCustomProps<E extends ElementType = ElementType> = {
    children: ReactNode;
    variant?: "light" | "dark";
    as?: E;
};

type ButtonProps<E extends ElementType> = ButtonCustomProps<E> &
    Omit<ComponentProps<E>, keyof ButtonCustomProps>;

const defaultElement = "button";

const ActionButton = <E extends ElementType = typeof defaultElement>({
    children,
    variant = "dark",
    className,
    as,
    ...rest
}: ButtonProps<E>) => {
    const TagName = as ?? defaultElement;
    return (
        <TagName
            className={cn(
                "action-button",
                `action-button--${variant}`,
                className,
            )}
            {...rest}
        >
            {children}
        </TagName>
    );
};

export default ActionButton;
