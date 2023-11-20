import { Outlet } from "react-router-dom";

import CharacterContextProvider from "../../Contexts/contactContextProvider";
import ContactList from "./ContactList/ContactList";

const Contacts = () => {
  return (
    <CharacterContextProvider>
      <div className="tw-flex tw-min-h-full tw-flex-grow tw-gap-2 tw-rounded-md tw-bg-white/40 tw-p-1 tw-backdrop-blur-md">
        <ContactList />
        <Outlet />
      </div>
    </CharacterContextProvider>
  );
};

export default Contacts;
