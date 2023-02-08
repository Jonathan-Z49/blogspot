import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { initUser, userContext } from '../contexts/userContext';
import Navbar from './Navbar';
const RouteSwitch = () => {
  const [user, setUser] = useState<User>(initUser);
  return (
    <userContext.Provider value={{ user, setUser }}>
      <BrowserRouter basename="/home">
        <Navbar />
        <Routes>
          <Route path="/posts">
            <Route path="/:id" />
            <Route path="/all" />
          </Route>
          <Route path="/user">
            <Route path=":id" />
          </Route>
          <Route path="/login" />
          <Route path="/profile" />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default RouteSwitch;
