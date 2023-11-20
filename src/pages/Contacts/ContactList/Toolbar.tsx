import React, { useRef } from "react";

import { useCharacterContextProvider } from "../../../Contexts/contactContextProvider";
import { debounced } from "../../../utils";

const Toolbar = () => {
  const { characterGender, characterStatus, setCharacterName, setCharacterGender, setCharacterStatus } = useCharacterContextProvider();

  const debouncedSetName = debounced((value: string) => {
    setCharacterName(value);
  }, 1000);

  return (
    <div>
      <input
        placeholder="Search Character"
        className="tw-mb-1 tw-w-full tw-rounded-md tw-bg-white/40 tw-p-3 tw-outline-none focus:tw-bg-white/60"
        onChange={event => debouncedSetName(event.target.value)}
      />
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-1 tw-text-xs">
        <div className="tw-flex tw-items-center tw-gap-1">
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            id="status"
            className="tw-cursor-pointer tw-bg-transparent tw-font-bold tw-outline-none"
            onChange={event => setCharacterStatus(event.target.value)}
            value={characterStatus}
          >
            <option value="" defaultChecked>
              Any
            </option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div className="tw-flex tw-gap-1">
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            id="gender"
            className="tw-cursor-pointer tw-bg-transparent tw-font-bold tw-outline-none"
            onChange={event => setCharacterGender(event.target.value)}
            value={characterGender}
          >
            <option value="" defaultChecked>
              Any
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
        <div className="tw-h-5 tw-w-4">
          {(characterGender || characterStatus) && (
            <button
              onClick={() => {
                setCharacterStatus("");
                setCharacterGender("");
              }}
              className="tw-rounded-md tw-bg-red-500 tw-transition-all tw-duration-200 hover:tw-bg-red-400"
            >
              <img src="/assets/x-mark.svg" alt="" className="tw-w-4 tw-text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
