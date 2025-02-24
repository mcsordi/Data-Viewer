import React, { useContext } from 'react';
import { theme } from '../../../contexts/ThemeContext/context';
import { FaSearch } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { RxDividerVertical } from 'react-icons/rx';
import { MdEdit } from 'react-icons/md';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';

export const HomePage: React.FC = () => {
  const editIcons = [
    { icon: <FaSearch />, textIcon: 'Pesquisar' },
    { icon: <FaSave />, textIcon: 'Salvar' },
    { icon: <MdEdit />, textIcon: 'Editar' },
    {
      icon: <RxDividerVertical />,
      theresClass: false,
      textClass: 'text-4xl',
      itsButton: false,
    },
    { icon: <IoArrowBackOutline />, textIcon: 'Voltar' },
  ];

  const { themeDark } = useContext(theme);
  return (
    <div className={`${themeDark && 'text-white'} flex w-full`}>
      <div
        className={`${themeDark ? 'bg-neutral-800' : ' bg-white'} border flex items-center justify-start border-slate-400 w-full h-14 rounded-md text-2xl gap-3 p-4`}
      >
        {editIcons.map((icon, index) => (
          <EditComponent
            key={index}
            icon={icon.icon}
            textClass={icon.textClass}
            theresClass={icon.theresClass}
            itsButton={icon.itsButton}
            textIcon={icon.textIcon}
          />
        ))}
      </div>
    </div>
  );
};
