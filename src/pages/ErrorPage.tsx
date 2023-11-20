import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const TIMEOUT_IN_MS = 8000;

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate('/'), TIMEOUT_IN_MS);
        return () => clearTimeout(timer);
    });

    return (
        <div className="tw-bg-white tw-rounded-xl tw-h-full flex tw-justify-center tw-items-center tw-overflow-hidden">
            <div className="tw-flex tw-justify-center tw-items-center tw-p-4 tw-text-center tw-flex-col tw-space-y-10">
                <div>
                    {/* <img src={NoAccessImg} alt="user access error" /> */}
                </div>
                <h2 className="tw-text-base tw-font-semibold tw-text-gray-500">
                    Oops, you do not have access to this page.
                </h2>
            </div>
        </div>
    );
};

export default ErrorPage;
