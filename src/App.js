import React from 'react'
import { Route, Routes } from 'react-router-dom';

import ExampleCRUD from './frontend/ExampleCRUD';
import HostDashboard from './frontend/Host Dashboard/HostDashboard';
import Landing from './frontend/Landing Page/Landing';
import CreateEvent from './frontend/CreateEvent';
import EventDetails from './frontend/EventDetails';
import VotingPage from './frontend/Voting Page/VotingPage';
import AuthContainer from './frontend/Auth/AuthContainer';

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/examplecrud"} element={<ExampleCRUD />} />
        <Route path={"/signup"} element={<AuthContainer login={false} />} />
        <Route path={"/login"} element={<AuthContainer login={true} />} />
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
