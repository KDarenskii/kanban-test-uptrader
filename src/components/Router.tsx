import { FC } from "react";

import { BOARD_PATH, HOME_PATH } from "constants/routes";
import { Route, Routes } from "react-router-dom";

import { BoardPage } from "pages/BoardPage";
import { HomePage } from "pages/HomePage";

const Router: FC = () => {
    return (
        <Routes>
            <Route path={HOME_PATH} element={<HomePage />} />
            <Route path={BOARD_PATH} element={<BoardPage />} />
        </Routes>
    );
};

export default Router;
