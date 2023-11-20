import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu';

const MainLayout = () => {
    return (
        <div className="tw-font-comfortaa tw-p-5 tw-flex tw-gap-2 tw-flex-row tw-min-h-screen tw-max-h-screen tw-bg-gradient-to-r tw-from-violet-500 tw-to-fuchsia-500">
            <Menu />
            <Outlet />
        </div>
    );
};

export default MainLayout;
