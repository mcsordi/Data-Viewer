import React, { useContext } from 'react';
import { DrawerNav } from '../../../shared/components/DrawerNav/DrawerNav';
import { ThemeButton } from '../../../shared/components/ThemeButton/ThemeButton';
import { drawerBtn } from '../../../contexts/DrawerButton/context';
import { Outlet, useLocation } from 'react-router-dom';
import { theme } from '../../../contexts/ThemeContext/context';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { IoExit } from 'react-icons/io5';
import { authContext } from '../../../contexts/AuthContext/context';
import { ProfileImage } from '../../../shared/components/ProfileImage/ProfileImage';
import { GenericDrawerButton } from '../../../shared/components/GenericDrawerButton/GenericDrawerButton';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { removePhoto } from '../../../contexts/RemovePhoto/context';
import { FaUserEdit } from 'react-icons/fa';
import { EditUserDrawer } from '../../../shared/components/EditUserDrawer/EditUserDrawer';
import { userDrawer } from '../../../contexts/EditUserDrawer/context';

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
  const { logout } = useContext(authContext);
  const { handleClickBtn } = useContext(removePhoto);
  const { handleOpenClick, openedDrawer } = useContext(userDrawer);

  return (
    <div className={`${themeDark} flex flex-row h-screen`}>
      {openedDrawer ? (
        <>
          <EditUserDrawer />
          <div className="flex flex-col h-full w-full absolute lg:relative dark:bg-zinc-900 bg-white pt-8 xs:px-4 sm:px-8">
            <Outlet />
          </div>
        </>
      ) : (
        <>
          <div
            className={`${showDrawer ? 'visible' : 'hidden'} dark:bg-zinc-800 bg-white relative z-10 lg:flex lg:flex-col lg:visible
        w-3/4 xs:w-2/4 sm:w-xs h-screen border border-slate-400`}
          >
            <div
              className={`dark:bg-neutral-800 bg-white border-l-0 border-t-0 border border-r-0
             border-slate-400 py-3  flex flex-col items-center justify-center gap-2`}
            >
              <ProfileImage />
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
                    `dark:bg-white dark:text-zinc-900 bg-zinc-800  text-white`
                  }
                />
              );
            })}
            <div className="w-full absolute bottom-0 ">
              <ThemeButton />
              <GenericDrawerButton
                icon={<FaUserEdit className="text-4xl dark:text-white" />}
                buttonText="Editar usuário"
                onClick={handleOpenClick}
              />
              <GenericDrawerButton
                icon={<BiSolidTrashAlt className="text-4xl dark:text-white" />}
                buttonText="Excluir foto"
                onClick={handleClickBtn}
              />
              <GenericDrawerButton
                icon={<IoExit className="text-4xl dark:text-amber-300" />}
                buttonText="Sair"
                onClick={() => {
                  logout(), localStorage.removeItem('ACCESS_APPLICATION_EMAIL');
                }}
              />
            </div>
          </div>
          <div
            className={`flex flex-col h-full w-full absolute lg:relative dark:bg-zinc-900 bg-white pt-8 xs:px-4 sm:px-8`}
          >
            <Outlet />
            <IoIosArrowDropleftCircle
              className={`${!showDrawer && 'rotate-180'} text-zinc-800 dark:text-amber-300 lg:hidden absolute text-4xl right-0 bottom-0 mx-6 my-4`}
              onClick={() => handleClick()}
            />
          </div>
        </>
      )}
    </div>
  );
};
