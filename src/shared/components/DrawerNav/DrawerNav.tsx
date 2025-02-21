import React from 'react';
import { Link } from 'react-router-dom';
type TDrawerNav = {
  icon: React.ReactNode;
  text: string;
  whereTo: string;
  color?: string;
};
export const DrawerNav: React.FC<TDrawerNav> = ({
  icon,
  text,
  whereTo,
  color,
}) => {
  return (
    <Link to={whereTo}>
      <div
        className={`${color} h-12 flex items-center gap-5 justify-center border w-full
            text-center border-r-0 border-l-0 border-slate-400 border-t-0`}
      >
        <div className=" w-1/4 flex items-end justify-end">{icon}</div>
        <div className="w-1/2 flex items-start justify-start">
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
};
