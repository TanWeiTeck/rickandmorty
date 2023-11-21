import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, useInfiniteQuery, useQuery } from "react-query";

import { AxiosResponse } from "axios";

import { fetchCharacter, fetchEpisode } from "../services/api";
import { Character, Episode } from "../types";

type CharacterResponse = AxiosResponse<{
  info: any;
  results: Character[];
}>;

interface IContactContext {
  character?: Character;
  episodes?: Episode[] | Episode;
  contacts?: InfiniteData<CharacterResponse>;
  hasNextPage: boolean | undefined;
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<CharacterResponse>>;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  isFetched: boolean;
  isFetchingEpisodes: boolean;
  isFetchingCharacter: boolean;
  characterGender: string;
  characterStatus: string;
  setCharacterName: Dispatch<SetStateAction<string>>;
  setCharacterGender: Dispatch<SetStateAction<string>>;
  setCharacterStatus: Dispatch<SetStateAction<string>>;
  setSelectedCharacterId: Dispatch<SetStateAction<string>>;
}

const CharacterContext = createContext<IContactContext | null>(null);

const CharacterContextProvider = ({ children }: PropsWithChildren) => {
  const [characterName, setCharacterName] = useState("");
  const [characterGender, setCharacterGender] = useState("");
  const [characterStatus, setCharacterStatus] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState("");
  const [episodes, setEpisodes] = useState<string[]>([]);

  const {
    data: contacts,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isFetched,
  } = useInfiniteQuery<AxiosResponse<{ info: any; results: Character[] }>>(
    ["character", characterName, characterGender, characterStatus],
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
        const nextPage = results.length === 20 ? allPages.length + 1 : undefined;
        return nextPage;
      },
      onError: error => {
        console.error("Error fetching contact:", error);
      },
    }
  );

  const { data: character, isFetching: isFetchingCharacter } = useQuery<AxiosResponse<Character>>(
    ["character", selectedCharacterId],
    () => fetchCharacter({ id: selectedCharacterId }),
    {
      enabled: !!selectedCharacterId,
    }
  );

  const { data: episodeResponse, isFetching: isFetchingEpisodes } = useQuery<AxiosResponse<Episode[] | Episode>>(
    ["episode", episodes],
    () => fetchEpisode({ episodes: episodes }),
    {
      enabled: episodes?.length > 0,
    }
  );

  useEffect(() => {
    const episodeList = character?.data.episode.map(episode => episode.split("/").pop()) as string[];
    setEpisodes(episodeList);
  }, [character?.data.episode]);

  return (
    <CharacterContext.Provider
      value={{
        character: character?.data,
        episodes: episodeResponse?.data,
        contacts,
        isFetching,
        isFetched,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetchingEpisodes,
        isFetchingCharacter,
        characterGender,
        characterStatus,
        setCharacterName,
        setCharacterGender,
        setCharacterStatus,
        setSelectedCharacterId,
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
    throw new Error("useCharacterContextProvider must be used within CharacterContextProvider");
  }

  return context;
};
