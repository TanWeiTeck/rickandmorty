import React, { useEffect } from 'react';
import Toolbar from './Toolbar';
import { useCharacterContextProvider } from '../../Contexts/contactContextProvider';
import { useInView } from 'react-intersection-observer';
import ContactCard from '../../components/ContactCard';

const ContactList = () => {
    // console.log('mount');
    const {
        contactList,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isFetched,
    } = useCharacterContextProvider();

    const { ref, inView } = useInView({ rootMargin: '0px 0px 300px 0px' });

    if (inView && hasNextPage && !isLoading) {
        fetchNextPage();
    }
    // useEffect(() => {
    //     console.log('inView', inView);
    // }, [inView, fetchNextPage, hasNextPage, isLoading]);

    return (
        <div className="tw-flex tw-flex-col tw-gap-2 tw-h-full tw-max-w-xs">
            <div className="tw-p-3 tw-text-center tw-font-bold">Contact</div>
            <Toolbar />
            <div
                className={`tw-h-full tw-shadow-inner tw-rounded-md tw-bg-black/10 tw-relative ${
                    isLoading && !isFetchingNextPage
                        ? 'tw-overflow-hidden'
                        : 'tw-overflow-y-scroll'
                }`}
            >
                {contactList ? (
                    <>
                        {contactList?.pages.map((page, index) => {
                            return (
                                <div key={`${page}-${index}`}>
                                    {page.data.results.map((result, index) => (
                                        <ContactCard
                                            data={result}
                                            key={`${result.id}${index}`}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                        <div
                            ref={ref}
                            className="tw-text-center tw-text-xs tw-text-gray-500"
                        >
                            {hasNextPage
                                ? 'getting more characters ...'
                                : 'hey! these are all we have'}
                        </div>
                    </>
                ) : (
                    <div className="tw-text-center tw-p-6 tw-text-gray-600">
                        {isFetched && 'I tried my best X _ X'}
                    </div>
                )}

                {isLoading && !isFetchingNextPage && (
                    <div className="tw-h-full tw-w-full tw-bg-black/30 tw-text-white tw-backdrop-blur-3xl tw-absolute tw-top-0 tw-flex tw-justify-center tw-items-center tw-p-5">
                        <img
                            src="/assets/arrow-path.svg"
                            alt="loading..."
                            className="tw-h-6 tw-animate-spin"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactList;
