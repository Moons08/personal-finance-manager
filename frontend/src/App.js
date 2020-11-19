import React from 'react';
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { css } from 'styled-components';

import BottomNavi from './components/BottomNavi/BottomNavi';
import AppRoute from './routes/AppRoute.jsx';

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <BottomNavi />
        <Switch>
          <AppRoute />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
