import { FC } from "react";

import { Route, Routes } from "react-router-dom";

import { BoardPage } from "pages/BoardPage";
import { HomePage } from "pages/HomePage";
import { MissingPage } from "pages/MissingPage";

import { BOARD_PATH, HOME_PATH } from "constants/routes";

const Router: FC = () => {
    return (
        <Routes>
            <Route path={HOME_PATH} element={<HomePage />} />
            <Route path={`${BOARD_PATH}/:id`} element={<BoardPage />} />
            <Route path="*" element={<MissingPage />} />
        </Routes>
    );
};

export default Router;
