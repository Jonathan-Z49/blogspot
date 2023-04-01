import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { initUser, UserContext } from '../contexts/UserContext';
import Login from './Login';
import Navbar from './Navbar';
import PostsContainer from './PostsContainer';
const RouteSwitch = () => {
  const [user, setUser] = useState<User>(initUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route
              index={true}
              element={<PostsContainer single_post={false} all_posts={true} />}
            />
          </Route>
          <Route path="/posts">
            <Route
              index={true}
              path=":id"
              element={<PostsContainer single_post={true} all_posts={false} />}
            />
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default RouteSwitch;
