import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../../contexts/ThemeContext/context';
import { drawerBtn } from '../../../contexts/DrawerButton/context';
type TDrawerNav = {
  icon: React.ReactNode;
  text: string;
  whereTo: string;
  selected?: false | string;
};
export const DrawerNav: React.FC<TDrawerNav> = ({
  icon,
  text,
  whereTo,
  selected,
}) => {
  const { themeDark } = useContext(theme);
  const { handleClick } = useContext(drawerBtn);
  return (
    <Link to={whereTo}>
      <div
        className={`${selected} ${themeDark ? 'bg-neutral-700 hover:text-black text-white hover:bg-white' : 'bg-zinc-100 hover:bg-zinc-600 hover:text-white'}  h-12 flex items-center
          gap-5 justify-center border w-full text-center border-r-0 border-l-0 border-slate-400 border-t-0`}
        onClick={() => handleClick()}
      >
        <div className=" w-1/4 flex items-end justify-end">{icon}</div>
        <div className="w-1/2 flex items-start justify-start">
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
};
