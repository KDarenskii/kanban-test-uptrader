import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import { Container } from "components/shared/Container";

import "./header.scss";

interface Props {
    className?: string;
}

const Header: FC<PropsWithChildren<Props>> = ({ className, children }) => {
    return (
        <header className={cn("header", className)}>
            <Container>{children}</Container>
        </header>
    );
};

export default Header;
