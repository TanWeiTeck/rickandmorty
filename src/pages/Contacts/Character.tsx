import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterContextProvider } from '../../Contexts/contactContextProvider';

const Character = () => {
    const { setSelectedCharacterId, character } = useCharacterContextProvider();
    const { id } = useParams();
    useEffect(() => {
        if (id) setSelectedCharacterId(id);
    }, [id, setSelectedCharacterId]);

    const { image, name, episode } = character || {};
    console.log('episode', episode);
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
                        <td>Name</td>
                        <td>Air Date</td>
                        <td>Episode</td>
                        <td>Created Date</td>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Character;
