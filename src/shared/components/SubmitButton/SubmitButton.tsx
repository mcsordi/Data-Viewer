import React from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';

type TSubmitButton = {
  text: string;
  loading: boolean;
};
export const SubmitButton: React.FC<TSubmitButton> = ({ text, loading }) => {
  return (
    <button
      type="submit"
      className="w-full xs:w-sm border px-2 py-2 mt-2 rounded-md cursor-pointer
     bg-slate-600 dark:bg-amber-300 text-white dark:text-black font-bold
  hover:bg-neutral-800 dark:hover:bg-white uppercase"
    >
      {loading ? (
        <CgSpinnerAlt className="animate-spin text-2xl  w-full flex items-center justify-center text-center" />
      ) : (
        text
      )}
    </button>
  );
};
