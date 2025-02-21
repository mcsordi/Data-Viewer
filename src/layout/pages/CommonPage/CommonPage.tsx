import React, { useContext } from 'react';
import { DrawerNav } from '../../../shared/components/DrawerNav/DrawerNav';
import { ThemeButton } from '../../../shared/components/ThemeButton/ThemeButton';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { drawerBtn } from '../../../contexts/DrawerButton/context';
import { useLocation } from 'react-router-dom';

type TCommonPage = {
  children: React.ReactNode;
  navigation: {
    icon: React.ReactNode;
    text: string;
    whereTo: string;
    color?: string;
  }[];
};
type Navigation = {
  icon: React.ReactNode;
  text: string;
  whereTo: string;
  color?: string;
};

export const CommonPage: React.FC<TCommonPage> = ({ children, navigation }) => {
  const { showDrawer, handleClick } = useContext(drawerBtn);
  const currentLocation = useLocation();

  return (
    <div className="flex flex-row bg-white">
      <div
        className={`${showDrawer ? 'visible' : 'hidden'} relative z-10 sm:flex sm:flex-col sm:visible bg-stone-200 w-3/4 xs:w-2/4 sm:w-xs min-h-screen border border-slate-400`}
      >
        <div className="bg-white border border-r-0 border-slate-400 h-28 flex items-center justify-center">
          <div className="w-20 border-0 rounded-full">
            <img
              className="rounded-full"
              alt="profile image"
              src="../1678304807285.jpeg"
            />
          </div>
        </div>
        {navigation?.map((item: Navigation) => {
          return (
            <DrawerNav
              key={item.text}
              icon={item.icon}
              text={item.text}
              whereTo={item.whereTo}
              color={
                currentLocation.pathname == item.whereTo
                  ? 'bg-zinc-600 text-white '
                  : 'bg-stone-200 hover:bg-zinc-400'
              }
            />
          );
        })}
        <ThemeButton />
      </div>

      <div className="flex absolute sm:relative">
        <button
          className="border border-neutral-300 visible sm:hidden"
          onClick={handleClick}
        >
          {showDrawer ? (
            <RxDoubleArrowRight className="rotate-180 ease-in-out transition duration-300" />
          ) : (
            <RxDoubleArrowRight className="ease-in-out transition duration-300" />
          )}
        </button>
        {children}
      </div>
    </div>
  );
};
