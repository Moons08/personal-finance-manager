import React from 'react';
import { BrowserRouter, Router, Link, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { css } from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

import AppRoute from './routes/AppRoute.jsx';

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <AppRoute />
        </Switch>
        <Paper square>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs"
            >
              <Tab
                icon={<AccountBalanceRoundedIcon />}
                //label="Home"
                component={Link}
                to="/home"
              />
              <Tab
                icon={<AppsRoundedIcon />}
                //label="Compter"
                component={Link}
                to="/compter"
              />
              <Tab
                icon={<PersonRoundedIcon />}
                //label="Mypage"
                component={Link}
                to="/mypage"
              />
            </Tabs>
        </Paper>
      </BrowserRouter>
    </div>
  );
}

export default App;
