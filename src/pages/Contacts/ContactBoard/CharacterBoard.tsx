import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useCharacterContextProvider } from "../../../Contexts/contactContextProvider";

const CharacterBoard = () => {
  const { id } = useParams();
  const { setSelectedCharacterId, character, episodes, isFetchingCharacter, isFetchingEpisodes } = useCharacterContextProvider();
  const { image, name, status, gender, species, location, origin, created } = character || {};

  useEffect(() => {
    if (id) setSelectedCharacterId(id);
  }, [id, setSelectedCharacterId]);

  return (
    <div className="tw-flex tw-h-full tw-flex-grow tw-flex-col tw-gap-2">
      <div className="tw-flex tw-h-32 tw-items-center tw-justify-end tw-gap-x-6 tw-p-3">
        <p className="tw-text-3xl">{name}</p>
        <img src={image} alt={name} className="tw-max-h-full tw-rounded-2xl tw-shadow-md" />
      </div>
      <div className="tw-flex tw-flex-grow tw-flex-col tw-rounded-lg tw-bg-white/30">
        <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-p-3">
          <p className="tw-col-span-2 tw-mb-3 tw-flex tw-gap-2 tw-font-bold">
            Personal Info
            {isFetchingCharacter && (
              <span>
                <img src="/assets/arrow-path.svg" alt="loading..." className="tw-h-5 tw-animate-spin" />
              </span>
            )}
          </p>
          <p className="tw-col-span-1 tw-text-sm">
            Status: <span className="tw-font-bold">{status || "-"}</span>
          </p>
          <p className="tw-col-span-1 tw-text-sm">
            Gender: <span className="tw-font-bold">{gender || "-"}</span>
          </p>
          <p className="tw-col-span-1 tw-text-sm">
            Species: <span className="tw-font-bold">{species || "-"}</span>
          </p>
          <p className="tw-col-span-1 tw-text-sm">
            Location: <span className="tw-font-bold">{location?.name || "-"}</span>
          </p>
          <p className="tw-col-span-1 tw-text-sm">
            Origin: <span className="tw-font-bold">{origin?.name || "-"}</span>
          </p>
          <p className="tw-col-span-1 tw-text-sm">
            Created Date: <span className="tw-font-bold">{new Date(created as string).toLocaleString() || "-"}</span>
          </p>
        </div>
        <hr className="tw-m-2" />
        <div className="tw-m-3 tw-flex tw-flex-grow tw-flex-col tw-gap-2">
          <p className="tw-col-span-2 tw-flex tw-gap-2 tw-font-bold">
            Episodes
            {isFetchingEpisodes && (
              <span>
                <img src="/assets/arrow-path.svg" alt="loading..." className="tw-h-5 tw-animate-spin" />
              </span>
            )}
          </p>

          <div className="tw-sticky tw-grid tw-grid-cols-11 tw-gap-1 tw-rounded-b-sm tw-rounded-t-md tw-bg-black/10 tw-p-1 tw-font-bold tw-shadow-inner">
            <div className="tw-col-span-5">Name</div>
            <div className="tw-col-span-2">Air Date</div>
            <div className="tw-col-span-2">Episode</div>
            <div className="tw-col-span-2">Created Date</div>
          </div>
          {episodes ? (
            <div className="tw-h-0 tw-flex-grow tw-overflow-y-scroll tw-rounded-b-md tw-rounded-t-sm tw-bg-black/10 tw-shadow-inner">
              {Array.isArray(episodes) ? (
                episodes.map(episode => (
                  <div className="tw-grid tw-cursor-default tw-grid-cols-11 tw-gap-1 tw-p-1 hover:tw-bg-white/10">
                    <div className="tw-col-span-5">{episode.name}</div>
                    <div className="tw-col-span-2">{episode.air_date}</div>
                    <div className="tw-col-span-2">{episode.episode}</div>
                    <div className="tw-col-span-2">{new Date(episode.created).toLocaleString()}</div>
                  </div>
                ))
              ) : (
                <div className="tw-grid tw-cursor-default tw-grid-cols-11 tw-gap-1 tw-p-1 hover:tw-bg-white/10">
                  <div className="tw-col-span-5">{episodes.name}</div>
                  <div className="tw-col-span-2">{episodes.air_date}</div>
                  <div className="tw-col-span-2">{episodes.episode}</div>
                  <div className="tw-col-span-2">{new Date(episodes.created).toLocaleString()}</div>
                </div>
              )}
            </div>
          ) : (
            <div>No data found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterBoard;
