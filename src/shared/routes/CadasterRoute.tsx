import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cadaster } from '../components/Cadaster/Cadaster';

export const CadasterRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastrar" element={<Cadaster />} />
      </Routes>
    </BrowserRouter>
  );
};
