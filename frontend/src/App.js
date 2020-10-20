/** @jsxFrag React.Fragment **/
import React from 'react';
import { Route } from 'react-router-dom';
import Main from './pages/Main';
import './index.css';

function App() {
  return (
    <>
      <Route path="/" component={Main} />
    </>
  );
}

export default App;
