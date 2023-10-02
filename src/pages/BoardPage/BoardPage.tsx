import { FC } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { AddTaskModal } from "components/board/AddTaskModal";
import { Tasks } from "components/board/Tasks";
import { Header } from "components/layout/Header";
import { Logo } from "components/shared/Logo";

import { selectProjectById } from "store/projects/selectors";

import useTypedSelector from "hooks/shared/useTypedSelector";

import { HOME_PATH, MISSING_PATH } from "constants/routes";

import "./boardPage.scss";

const BoardPage: FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const project = useTypedSelector((state) =>
        selectProjectById(state, id ?? ""),
    );

    if (!id || !project) {
        navigate(MISSING_PATH);
        return null;
    }

    return (
        <>
            <Header className="board-page-header">
                <div className="board-page-header__wrapper">
                    <Link to={HOME_PATH}>
                        <Logo />
                    </Link>
                    <AddTaskModal projectId={id} />
                </div>
            </Header>
            <main className="board-page-main">
                <Tasks projectId={id} />
            </main>
        </>
    );
};

export default BoardPage;
