import React, { useContext } from 'react';
import { theme } from '../../../contexts/ThemeContext/context';
type TEditComponent = {
  icon: React.ReactNode;
  textIcon?: string;
  theresClass?: boolean;
  textClass?: string;
  itsButton?: boolean;
};

export const EditComponent: React.FC<TEditComponent> = ({
  icon,
  textIcon,
  theresClass = true,
  textClass,
  itsButton = true,
}) => {
  {
    const { themeDark } = useContext(theme);
    return itsButton ? (
      <button
        className={`${themeDark ? 'bg-zinc-900 hover:bg-amber-300 hover:text-black' : 'bg-slate-200 hover:bg-slate-600 hover:text-white'}
    flex items-center gap-2 border py-1 px-2 rounded-md border-slate-400 cursor-pointer`}
      >
        {icon}
        <div
          className={`${theresClass ? 'hidden xs:flex xs:w-8 truncate lg:w-auto text-xl' : textClass}`}
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
