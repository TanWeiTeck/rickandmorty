import React from 'react';
import { Character } from '../types';
import { useNavigate } from 'react-router-dom';

const CharacterCard = ({ data }: { data: Character }) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        // Assuming "/character" is the path you want to navigate to
        navigate(`/contacts/${data.id}`);
    };
    return (
        <div
            className="tw-flex tw-items-center tw-gap-3 tw-p-2 hover:tw-bg-white/20 tw-cursor-pointer"
            onClick={clickHandler}
        >
            <img
                src={data.image}
                alt={data.name}
                className="tw-w-14 tw-rounded-full"
            />
            <div>
                <p className="tw-font-bold">{data.name}</p>
                <p className="tw-text-sm">{data.species}</p>
            </div>
        </div>
    );
};

export default CharacterCard;
