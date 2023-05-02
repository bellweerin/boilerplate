import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const BlankPage = lazy(() => import('../../container/pages/BlankPage'));
const Test = lazy(()=>import('../../container/pages/Test'))

function PagesRoute() {
  return (
    <Routes>
      <Route index element={<BlankPage />} />
      <Route path="starter" element={<BlankPage />} />
      <Route path="test" element={<Test />} />
    </Routes>
  );
}

export default PagesRoute;
