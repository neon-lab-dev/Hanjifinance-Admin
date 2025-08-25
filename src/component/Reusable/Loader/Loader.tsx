import React from "react";

type LoaderProps = {
  text?: string;
};

const Loader: React.FC<LoaderProps> = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 py-6">
      {/* Spinner */}
      <div className="h-12 w-12 border-4 border-primary-10 border-t-transparent rounded-full animate-spin"></div>
      
      {/* Text */}
      <span className="text-neutral-10 font-medium">{text}</span>
    </div>
  );
};

export default Loader;
