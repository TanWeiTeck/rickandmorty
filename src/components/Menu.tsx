import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Menu = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div
            className={`tw-bg-white/40 tw-p-1 tw-flex tw-gap-2 tw-flex-col tw-min-h-full tw-rounded-md tw-backdrop-blur-md tw-transition-all tw-duration-200 ${
                collapsed && 'tw-w-14'
            }`}
        >
            <Link
                to={'/'}
                className="tw-flex tw-flex-row tw-items-center tw-gap-4 tw-p-3"
            >
                <img
                    src="/assets/menu/rickandmorty.png"
                    alt="icon"
                    className="tw-w-6"
                />
                {!collapsed && <div>Rick and Morty</div>}
            </Link>

            <NavLink
                to={'contacts'}
                className={({ isActive }) =>
                    `tw-flex tw-flex-row tw-items-center tw-gap-4 tw-p-3 tw-rounded-md hover:tw-bg-white/30 tw-transition-all tw-duration-200 ${
                        isActive && 'tw-bg-white/40'
                    }`
                }
            >
                <img src="/assets/menu/profile.svg" alt="" className="tw-w-6" />
                {!collapsed && <span>Contact</span>}
            </NavLink>
            <button
                className="tw-p-3 tw-min-w-full tw-flex tw-mt-auto"
                onClick={() => setCollapsed((prev) => !prev)}
            >
                <img
                    src="/assets/menu/chevron-right.svg"
                    alt=""
                    className={`tw-w-6 tw-transition-all tw-duration-300 ${
                        !collapsed && 'tw-rotate-180 tw-ml-auto'
                    }`}
                />
            </button>
        </div>
    );
};

export default Menu;
