import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from 'react';
import { Character } from '../types';
import { fetchCharacter, fetchEpisode } from '../services/api';
import {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
    useInfiniteQuery,
    useQuery,
} from 'react-query';
import { AxiosResponse } from 'axios';

type CharacterResponse = AxiosResponse<{
    info: any;
    results: Character[];
}>;

interface IContactContext {
    contactList?: InfiniteData<CharacterResponse>;
    hasNextPage: boolean | undefined;
    fetchNextPage: (
        options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult<CharacterResponse>>;
    isLoading: boolean;
    setCharacterName: Dispatch<SetStateAction<string>>;
    setCharacterGender: Dispatch<SetStateAction<string>>;
    setCharacterStatus: Dispatch<SetStateAction<string>>;
    setSelectedCharacterId: Dispatch<SetStateAction<string>>;
    isFetchingNextPage: boolean;
    isFetched: boolean;
    character?: Character;
    episode?: any;
}

const CharacterContext = createContext<IContactContext | null>(null);

const CharacterContextProvider = ({ children }: PropsWithChildren) => {
    const [characterName, setCharacterName] = useState('');
    const [characterGender, setCharacterGender] = useState('');
    const [characterStatus, setCharacterStatus] = useState('');
    const [selectedCharacterId, setSelectedCharacterId] = useState('');
    const [episode, setEpisode] = useState<string[]>([]);
    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        isFetched,
    } = useInfiniteQuery<AxiosResponse<{ info: any; results: Character[] }>>(
        ['character', characterName, characterGender, characterStatus],
        ({ pageParam = 1 }) =>
            fetchCharacter({
                page: pageParam,
                name: characterName,
                gender: characterGender,
                status: characterStatus,
            }),
        {
            getNextPageParam: (lastPage, allPages) => {
                const { results } = lastPage.data;
                const nextPage =
                    results.length === 20 ? allPages.length + 1 : undefined;
                return nextPage;
            },
        }
    );

    const { data: character } = useQuery<AxiosResponse<Character>>(
        ['character', selectedCharacterId],
        () => fetchCharacter({ id: selectedCharacterId }),
        {
            onSuccess: ({ data }) => {
                const episodeList = data.episode.map((episode) =>
                    episode.split('/').pop()
                ) as string[];
                setEpisode(episodeList);
            },
            enabled: !!selectedCharacterId,
        }
    );

    const { data: episodeResponse } = useQuery(
        ['episode', episode],
        () => fetchEpisode({ episodes: episode }),
        { enabled: episode.length > 0 }
    );
    return (
        <CharacterContext.Provider
            value={{
                contactList: data,
                isLoading: isFetching,
                hasNextPage,
                fetchNextPage,
                setCharacterName,
                setCharacterGender,
                setCharacterStatus,
                isFetchingNextPage,
                isFetched,
                setSelectedCharacterId,
                character: character?.data,
                episode: episodeResponse?.data,
            }}
        >
            {children}
        </CharacterContext.Provider>
    );
};

export default CharacterContextProvider;

export const useCharacterContextProvider = () => {
    const context = useContext(CharacterContext);

    if (!context) {
        throw new Error(
            'useCharacterContextProvider must be used within CharacterContextProvider'
        );
    }

    return context;
};
