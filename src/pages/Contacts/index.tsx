import React from 'react';
import ContactList from './ContactList';
import { Outlet } from 'react-router-dom';

const Contacts = () => {
    return (
        <div className="tw-bg-white/40 tw-p-1 tw-flex tw-gap-2 tw-min-h-full tw-rounded-md tw-backdrop-blur-md tw-flex-grow">
            <ContactList />
            <Outlet />
        </div>
    );
};

export default Contacts;
