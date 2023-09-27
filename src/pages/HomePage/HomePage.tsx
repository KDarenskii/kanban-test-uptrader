import { FC } from "react";

import { Link } from "react-router-dom";

import { Header } from "components/layout/Header";
import { Projects } from "components/projects/Projects";
import { Logo } from "components/shared/Logo";
import { ActionButton } from "components/ui/ActionButton";

import { HOME_PATH } from "constants/routes";

import "./homePage.scss";

const HomePage: FC = () => {
    return (
        <>
            <Header className="home-page-header">
                <div className="home-page-header__wrapper">
                    <Link to={HOME_PATH}>
                        <Logo />
                    </Link>
                    <ActionButton>+ Add New Project</ActionButton>
                </div>
            </Header>
            <main className="home-page-main">
                <Projects />
            </main>
        </>
    );
};

export default HomePage;
