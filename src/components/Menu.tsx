import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className={`tw-flex tw-min-h-full tw-min-w-fit tw-flex-col tw-gap-2 tw-rounded-md tw-bg-white/40 tw-p-1 tw-backdrop-blur-md tw-transition-all tw-duration-200 ${
        collapsed && "tw-w-14"
      }`}
    >
      <Link to={"/"} className="tw-flex tw-flex-row tw-items-center tw-gap-4 tw-p-3">
        <img src="/assets/menu/rickandmorty.png" alt="icon" className="tw-w-6" />
        {!collapsed && <div>Rick and Morty</div>}
      </Link>

      <NavLink
        to={"contacts"}
        className={({ isActive }) =>
          `tw-flex tw-flex-row tw-items-center tw-gap-4 tw-rounded-md tw-p-3 tw-transition-all tw-duration-200 hover:tw-bg-white/30 ${
            isActive && "tw-bg-white/40"
          }`
        }
      >
        <img src="/assets/menu/profile.svg" alt="" className="tw-w-6" />
        {!collapsed && <span>Contact</span>}
      </NavLink>
      <button className="tw-mt-auto tw-flex tw-min-w-full tw-p-3" onClick={() => setCollapsed(prev => !prev)}>
        <img
          src="/assets/menu/chevron-right.svg"
          alt=""
          className={`tw-w-6 tw-transition-all tw-duration-300 ${!collapsed && "tw-ml-auto tw-rotate-180"}`}
        />
      </button>
    </div>
  );
};

export default Menu;
