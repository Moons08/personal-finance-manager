import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Join from '../pages/Join';
import Home from '../pages/Home';
import Compter from '../pages/Compter';
import Mypage from '../pages/Mypage';
import UserInfoChng from '../pages/UserInfoChng';
import '../index.css';

export default function AppRoute() {
  return (
    <>
      <Route path="/" exact component={Login} />
      <Route path="/join" component={Join} />
      <Route path="/home" component={Home} />
      <Route path="/compter" component={Compter} />
      <Route path="/mypage" component={Mypage} />
      <Route path="/info-change" component={UserInfoChng} />
    </>
  );
}

