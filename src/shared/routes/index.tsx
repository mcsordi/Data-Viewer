import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CommonPage } from '../../layout/pages/CommonPage/CommonPage';
import { FaHome } from 'react-icons/fa';
import { BsBuildingsFill } from 'react-icons/bs';
import { IoPeopleSharp } from 'react-icons/io5';
import { HomePage } from '../../layout/pages/HomePage/HomePage';
import { FaSearch } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { RxDividerVertical } from 'react-icons/rx';
import { MdEdit } from 'react-icons/md';
import { CityPage } from '../../layout/pages/CityPage/CityPage';
import { PeoplePage } from '../../layout/pages/PeoplePage/PeoplePage';
import { NewPersonCadaster } from '../../layout/pages/NewPersonCadaster/NewCadaster';
import { EditPersonPage } from '../../layout/pages/EditPersonPage/EditPersonPage';

export const RouterBrowser: React.FC = () => {
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
    {
      icon: <IoArrowBackOutline />,
      textIcon: 'Voltar',
    },
  ];
  const navigate = [
    {
      icon: <FaHome />,
      text: 'Página Inicial',
      whereTo: '/',
    },
    {
      icon: <BsBuildingsFill />,
      text: 'Cidades',
      whereTo: '/cidades',
    },
    {
      icon: <IoPeopleSharp />,
      text: 'Pessoas',
      whereTo: '/pessoas',
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonPage navigation={navigate} />}>
          <Route index element={<HomePage />} />
          <Route path="/cidades" element={<CityPage editIcons={editIcons} />} />
          <Route path="/pessoas" element={<PeoplePage />} />
          <Route
            path="/nova-pessoa"
            element={<NewPersonCadaster editIcons={editIcons} />}
          />
          <Route
            path="/editar/:nome"
            element={<EditPersonPage editIcons={editIcons} />}
          />
          <Route path={'/*'} element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
