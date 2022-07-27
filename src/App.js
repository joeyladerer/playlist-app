import React from 'react'
import { Route, Routes } from 'react-router-dom';

import ExampleCRUD from './Main Pages/ExampleCRUD';
import Landing from './Main Pages/Landing';
import SignUp from './Main Pages/SignUp';

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/examplecrud"} element={<ExampleCRUD />}></Route>
        <Route path={"/signup"} element={<SignUp />}></Route>
        <Route path={"/"} element={<Landing />}></Route>
      </Routes>
    </div>
  );
}

export default App;
