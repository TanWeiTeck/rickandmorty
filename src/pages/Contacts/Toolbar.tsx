import React, { useRef } from 'react';
import { useCharacterContextProvider } from '../../Contexts/contactContextProvider';

const Toolbar = () => {
    const { setCharacterName, setCharacterGender, setCharacterStatus } =
        useCharacterContextProvider();
    return (
        <div>
            <input
                placeholder="Search Character"
                className="tw-bg-white/40 focus:tw-bg-white/60 tw-rounded-md tw-p-3 tw-w-full tw-outline-none tw-mb-1"
                onChange={(event) => setCharacterName(event.target.value)}
            />
            <div className="tw-text-sm tw-flex tw-gap-2">
                <div className="tw-flex tw-gap-1 tw-items-center">
                    <label htmlFor="status">Status:</label>
                    <select
                        name="status"
                        id="status"
                        className="tw-bg-transparent tw-outline-none tw-font-bold"
                        onChange={(event) =>
                            setCharacterStatus(event.target.value)
                        }
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
                        className="tw-bg-transparent tw-outline-none tw-font-bold"
                        onChange={(event) =>
                            setCharacterGender(event.target.value)
                        }
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
            </div>
        </div>
    );
};

export default Toolbar;
