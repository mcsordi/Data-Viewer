import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CommonPage } from '../../layout/pages/CommonPage/CommonPage';
import { FaHome } from 'react-icons/fa';
import { BsBuildingsFill } from 'react-icons/bs';
import { IoPeopleSharp } from 'react-icons/io5';
import { HomePage } from '../../layout/pages/HomePage/HomePage';
import { IoArrowBackOutline } from 'react-icons/io5';
import { RxDividerVertical } from 'react-icons/rx';
import { CityPage } from '../../layout/pages/CityPage/CityPage';
import { PeoplePage } from '../../layout/pages/PeoplePage/PeoplePage';
import { NewPersonCadaster } from '../../layout/pages/NewPersonCadaster/NewCadaster';
import { EditPersonPage } from '../../layout/pages/EditPersonPage/EditPersonPage';
import { NewCityCadaster } from '../../layout/pages/NewCityCadaster/NewCityCadaster';
import { EditCityPage } from '../../layout/pages/EditCityPage/EditCityPage';
import { PiBuildingApartmentFill } from 'react-icons/pi';
import { LoginPage } from '../../layout/pages/LoginPage/LoginPage';
import { CadasterPage } from '../../layout/pages/CadasterPage/CadasterPage';
import { ProtectedRoutes } from './ProtectedRoutes';

export const RouterBrowser: React.FC = () => {
  const editIcons = [
    {
      icon: <FaHome />,
      textIcon: 'Página Inicial',
      whereToNav: '/pagina-inicial',
    },
    {
      icon: <IoPeopleSharp />,
      textIcon: 'Cadastrar Pessoa',
      whereToNav: '/nova-pessoa',
    },
    {
      icon: <PiBuildingApartmentFill />,
      textIcon: 'Cadastrar Cidade',
      whereToNav: '/nova-cidade',
    },
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
      whereTo: '/pagina-inicial',
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
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastrar" element={<CadasterPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<CommonPage navigation={navigate} />}>
            <Route path="/pagina-inicial" element={<HomePage />} />
            <Route path="/cidades" element={<CityPage />} />
            <Route path="/pessoas" element={<PeoplePage />} />
            <Route
              path="/nova-pessoa"
              element={<NewPersonCadaster editIcons={editIcons} />}
            />
            <Route
              path="/nova-cidade"
              element={<NewCityCadaster editIcons={editIcons} />}
            />
            <Route
              path="/editar/:nome"
              element={<EditPersonPage editIcons={editIcons} />}
            />
            <Route
              path="/editar/cidade/:cidade"
              element={<EditCityPage editIcons={editIcons} />}
            />
            <Route path={'/*'} element={<Navigate to="/pagina-inicial" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
