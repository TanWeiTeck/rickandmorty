import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterContextProvider } from '../../Contexts/contactContextProvider';

const Character = () => {
    const { setSelectedCharacterId, character, episodes } =
        useCharacterContextProvider();
    const { id } = useParams();
    useEffect(() => {
        if (id) setSelectedCharacterId(id);
    }, [id, setSelectedCharacterId]);

    const { image, name, episode } = character || {};

    return (
        <>
            <div>
                <img src={image} alt={name} />
                <p>{name}</p>
            </div>
            <div>
                <p>Personal Info</p>
                <div>
                    <p>Status</p>
                    <p>Gender</p>
                    <p>Species</p>
                    <p>Location</p>
                    <p>Origin</p>
                    <p>Created Date</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Air Date</th>
                            <th>Episode</th>
                            <th>Created Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes?.map((episode) => (
                            <tr>
                                <td>{episode.name}</td>
                                <td>{episode.air_date}</td>
                                <td>{episode.episode}</td>
                                <td>
                                    {new Date(episode.created).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Character;
