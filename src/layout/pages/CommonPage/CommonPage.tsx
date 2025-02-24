import React, { useContext } from 'react';
import { DrawerNav } from '../../../shared/components/DrawerNav/DrawerNav';
import { ThemeButton } from '../../../shared/components/ThemeButton/ThemeButton';
import { drawerBtn } from '../../../contexts/DrawerButton/context';
import { Outlet, useLocation } from 'react-router-dom';
import { theme } from '../../../contexts/ThemeContext/context';

type TCommonPage = {
  navigation: {
    icon: React.ReactNode;
    text: string;
    whereTo: string;
    selected?: false | string;
  }[];
};
type Navigation = {
  icon: React.ReactNode;
  text: string;
  whereTo: string;
  selected?: false | string;
};

export const CommonPage: React.FC<TCommonPage> = ({ navigation }) => {
  const { showDrawer, handleClick } = useContext(drawerBtn);
  const currentLocation = useLocation();
  const { themeDark } = useContext(theme);

  return (
    <div className={`flex flex-row`}>
      <div
        className={`${showDrawer ? 'visible' : 'hidden'} ${themeDark ? 'bg-zinc-700' : 'bg-white'} relative z-10 md:flex md:flex-col md:visible
        w-3/4 xs:w-2/4 sm:w-xs min-h-screen border border-slate-400`}
      >
        <div
          className={`${themeDark ? 'bg-neutral-800' : 'bg-white'} border-l-0 border-t-0 border border-r-0 border-slate-400 h-28 flex items-center justify-center`}
        >
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
              selected={
                currentLocation.pathname == item.whereTo &&
                `${themeDark ? 'bg-white text-zinc-900' : 'bg-zinc-600 hover:bg-zinc-600 text-white'}`
              }
            />
          );
        })}
        <ThemeButton />
      </div>
      <div
        className={`flex h-screen w-full absolute md:relative ${themeDark ? 'bg-zinc-900' : 'bg-white'} p-12`}
      >
        <Outlet />
      </div>
    </div>
  );
};
