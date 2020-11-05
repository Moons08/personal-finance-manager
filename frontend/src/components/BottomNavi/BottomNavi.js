import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';


export default function BottomNavi() {
    const [value, setValue] = React.useState(0);
    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    return (
        <Paper square>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs"
              visible={false}
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
    );
}