import React from 'react';
import { useNavigate } from 'react-router-dom';
type TEditComponent = {
  icon: React.ReactNode;
  textIcon?: string;
  theresClass?: boolean;
  textClass?: string;
  itsButton?: boolean;
  whereToNav?: string;
};

export const EditComponent: React.FC<TEditComponent> = ({
  icon,
  textIcon,
  theresClass = true,
  textClass,
  itsButton = true,
  whereToNav = '',
}) => {
  const navigate = useNavigate();
  {
    return itsButton ? (
      <button
        className={`dark:bg-zinc-900 dark:hover:bg-amber-300 dark:hover:text-black dark:focus:bg-amber-300 dark:focus:text-black
       bg-slate-200 hover:bg-slate-600 hover:text-white focus:bg-slate-600 focus:text-white
         flex items-center gap-2 border py-1 px-2 rounded-md border-slate-400 cursor-pointer truncate`}
        onClick={() => navigate(whereToNav)}
      >
        {icon}
        <div
          className={`${theresClass ? 'w-12 hidden truncate md:w-full xs:visible xs:flex text-xl' : textClass}`}
        >
          {textIcon}
        </div>
      </button>
    ) : (
      <div
        className={`${theresClass ? 'hidden xs:flex xs:w-8 truncate lg:w-auto text-xl' : textClass}`}
      >
        {icon}
      </div>
    );
  }
};
