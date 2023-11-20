import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const TIMEOUT_IN_MS = 5000;

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), TIMEOUT_IN_MS);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex tw-h-full tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-xl tw-bg-white">
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-10 tw-p-4 tw-text-center">
        <h2 className="tw-text-base tw-font-semibold tw-text-gray-500">Oops, you do not have access to this page.</h2>
      </div>
    </div>
  );
};

export default ErrorPage;
