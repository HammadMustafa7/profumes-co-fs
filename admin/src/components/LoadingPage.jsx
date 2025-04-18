import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700 text-lg">Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
