import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CommonPage } from '../../layout/pages/CommonPage';
import { FaHome } from 'react-icons/fa';
import { BsBuildingsFill } from 'react-icons/bs';
import { IoPeopleSharp } from 'react-icons/io5';

export const RouterBrowser: React.FC = () => {
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
        <Route
          path="/"
          element={
            <CommonPage navigation={navigate}>
              <p>init page</p>
            </CommonPage>
          }
        />
        <Route
          path="/cidades"
          element={
            <CommonPage navigation={navigate}>
              <p>cidades</p>
            </CommonPage>
          }
        />
        <Route
          path="/pessoas"
          element={
            <CommonPage navigation={navigate}>
              <p>pessoas</p>
            </CommonPage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
