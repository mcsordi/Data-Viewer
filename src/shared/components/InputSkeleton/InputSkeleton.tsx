import React from 'react';

export const InputSkeleton: React.FC = () => {
  return (
    <div>
      <div className="w-lg h-10 rounded-md dark:from-neutral-700 dark:to-neutral-800 from-gray-100 to-gray-200 bg-gradient-to-r from-80% animate-pulse"></div>
    </div>
  );
};
