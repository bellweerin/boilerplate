import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const BlankPage = lazy(() => import('../../container/pages/BlankPage'));
const Test = lazy(() => import('../../container/pages/Test'))
const DataTable = lazy(() => import('../../container/pages/DataTable'));

function PagesRoute() {
  return (
    <Routes>
      <Route index element={<BlankPage />} />
      <Route path="starter" element={<BlankPage />} />
      <Route path="test" element={<Test />} />
      <Route path="test2" element={<DataTable />} />
    </Routes>
  );
}

export default PagesRoute;
