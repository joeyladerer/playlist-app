import React from 'react'
import { Route, Routes } from 'react-router-dom';

import ExampleCRUD from './Main Pages/ExampleCRUD';
import HostDashboard from './Main Pages/HostDashboard';
import Landing from './Main Pages/Landing';
import LogIn from './Main Pages/Auth/LogIn';
import SignUp from './Main Pages/Auth/SignUp';
import CreateEvent from './Main Pages/CreateEvent';
import EventDetails from './Main Pages/EventDetails';
import VotingPage from './Main Pages/VotingPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/examplecrud"} element={<ExampleCRUD />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/login"} element={<LogIn />} />
        <Route path={"/dashboard"} element={<HostDashboard />} />
        <Route path={"/createevent"} element={<CreateEvent />} />
        <Route path={"/event/:id"} element={<EventDetails />} />
        <Route path={"/vote/:id"} element={<VotingPage />} />
        <Route path={"/"} element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
