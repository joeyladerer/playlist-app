import React from 'react'
import { Route, Routes } from 'react-router-dom';

import ExampleCRUD from './ExampleCRUD';
import Dashboard from './Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/examplecrud"} element={<ExampleCRUD />}></Route>
        <Route path={"/"} element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
