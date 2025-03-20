import React from 'react';
import { Link } from 'react-router-dom';

type TNewButton = {
  whereTo: string;
  text: 'NOVO' | 'NOVA';
};

export const NewButton: React.FC<TNewButton> = ({ whereTo, text }) => {
  return (
    <Link to={whereTo}>
      <button
        className={`hidden lg:flex bg-zinc-800 hover:text-amber-300 dark:bg-white border border-slate-300
                 md:flex items-center justify-center px-4 py-2 rounded-md
              cursor-pointer dark:text-neutral-800 text-white text-xl font-bold`}
      >
        {text}
      </button>
    </Link>
  );
};
