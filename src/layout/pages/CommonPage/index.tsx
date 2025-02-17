import React from 'react';
import { DrawerNav } from '../../../shared/components/DrawerNav/DrawerNav';
import { ThemeButton } from '../../../shared/components/ThemeButton/ThemeButton';
type TCommonPage = {
  children: React.ReactNode;
  navigation: { icon: React.ReactNode; text: string; whereTo: string }[];
};
type Navigation = { icon: React.ReactNode; text: string; whereTo: string };

export const CommonPage: React.FC<TCommonPage> = ({ children, navigation }) => {
  return (
    <div className="flex flex-row bg-white">
      <div className="bg-slate-200 w-xs min-h-screen border border-slate-400 relative">
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
            />
          );
        })}
        <ThemeButton />
      </div>
      <div>{children}</div>
    </div>
  );
};
