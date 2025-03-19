import React from 'react';

type TSubmitButton = {
  text: string;
};
export const SubmitButton: React.FC<TSubmitButton> = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-96 disabled:bg-amber-700 border px-2 py-2 mt-2 rounded-md cursor-pointer
     bg-slate-600 dark:bg-amber-300 text-white dark:text-black font-bold
  hover:bg-neutral-800 dark:hover:bg-white uppercase"
    >
      {text}
    </button>
  );
};
