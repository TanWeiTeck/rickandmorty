import { Outlet } from "react-router-dom";

import Menu from "../components/Menu";

const MainLayout = () => {
  return (
    <div className="tw-flex tw-max-h-screen tw-min-h-screen tw-flex-row tw-gap-2 tw-bg-gradient-to-r tw-from-violet-500 tw-to-fuchsia-500 tw-p-2 tw-font-comfortaa">
      <Menu />
      <Outlet />
    </div>
  );
};

export default MainLayout;
