import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CommonPage } from '../../layout/pages/CommonPage';

export const RouterBrowser: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CommonPage>
              <p>init page</p>
            </CommonPage>
          }
        />
        <Route
          path="/cidades"
          element={
            <CommonPage>
              <p>cidades</p>
            </CommonPage>
          }
        />
        <Route
          path="/pessoas"
          element={
            <CommonPage>
              <p>pessoas</p>
            </CommonPage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
