import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Test = lazy(() => import('../../container/pages/Test'));

function TestRoute() {
  return (
    <Routes>
      <Route path="testnn" element={<Test />} />
    </Routes>
  );
}

export default TestRoute;
