import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { initUser, UserContext } from '../contexts/UserContext';
import Login from './Login';
import Navbar from './Navbar';
import Posts from './Posts';
const RouteSwitch = () => {
  const [user, setUser] = useState<User>(initUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Navbar />
        {/* <Routes>
          <Route path="/posts">
            <Route path="/posts/:id" />
            <Route path="/posts/all" />
          </Route>
          <Route path="/user">
            <Route path="/user/:id" />
          </Route>
          <Route path="/login" />
          <Route path="/profile" />
        </Routes> */}
        <Routes>
          <Route path="/" element={<Posts />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default RouteSwitch;
