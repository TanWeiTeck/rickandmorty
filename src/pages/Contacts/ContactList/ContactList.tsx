import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useCharacterContextProvider } from "../../../Contexts/contactContextProvider";
import ContactCard from "../../../components/ContactCard";
import Toolbar from "./Toolbar";

const ContactList = () => {
  const { contacts, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isFetched } = useCharacterContextProvider();

  const { ref, inView } = useInView({ rootMargin: "0px 0px 300px 0px" });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  return (
    <div className="tw-flex tw-h-full tw-min-w-[320px] tw-max-w-xs tw-flex-col tw-gap-2">
      <div className="tw-p-3 tw-text-center tw-font-bold">Contact</div>
      <Toolbar />
      <div className="tw-relative tw-flex tw-h-0 tw-flex-grow tw-overflow-hidden tw-rounded-md tw-bg-black/10 tw-shadow-inner">
        <div className="tw-relative tw-h-full tw-w-full tw-overflow-y-scroll">
          {contacts ? (
            <>
              {contacts?.pages.map((page, index) => {
                return (
                  <div key={`${page}-${index}`}>
                    {page.data.results.map((result, index) => (
                      <ContactCard data={result} key={`${result.id}${index}`} />
                    ))}
                  </div>
                );
              })}
              <div ref={ref} className="tw-text-center tw-text-xs tw-text-gray-500">
                {hasNextPage ? "getting more characters ..." : "hey! these are all we have"}
              </div>
            </>
          ) : (
            <div className="tw-w-full tw-p-6 tw-text-center tw-text-gray-600">{isFetched && "I tried my best X _ X"}</div>
          )}
        </div>
        {isFetching && !isFetchingNextPage && (
          <div className="tw-absolute tw-top-0 tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-bg-black/30 tw-p-5 tw-text-white tw-backdrop-blur-3xl">
            <img src="/assets/arrow-path.svg" alt="loading..." className="tw-h-6 tw-animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
