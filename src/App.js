import React from 'react'
import { Route, Routes } from 'react-router-dom';

import ExampleCRUD from './frontend/ExampleCRUD';
import HostDashboard from './frontend/HostDashboard';
import Landing from './frontend/Landing Page/Landing';
import LogIn from './frontend/Auth/LogIn';
import SignUp from './frontend/Auth/SignUp';
import CreateEvent from './frontend/CreateEvent';
import EventDetails from './frontend/EventDetails';
import VotingPage from './frontend/Voting Page/VotingPage';

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
