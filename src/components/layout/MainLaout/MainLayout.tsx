import { FC } from "react";

import { Outlet } from "react-router-dom";

import "./layout.scss";

const MainLaout: FC = () => {
    return (
        <div className="main-layout">
            <header></header>
            <main></main>
        </div>
    );
};

export default MainLaout;
