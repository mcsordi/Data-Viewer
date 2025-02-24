import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CommonPage } from '../../layout/pages/CommonPage/CommonPage';
import { FaHome } from 'react-icons/fa';
import { BsBuildingsFill } from 'react-icons/bs';
import { IoPeopleSharp } from 'react-icons/io5';
import { HomePage } from '../../layout/pages/HomePage/HomePage';

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
        <Route path="/" element={<CommonPage navigation={navigate} />}>
          <Route index element={<HomePage />} />
          <Route path="/cidades" element={<p>cidades</p>} />
          <Route path="/pessoas" element={<p>pessoas</p>} />
          <Route path={'/*'} element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
