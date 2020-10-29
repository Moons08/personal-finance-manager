import React from 'react';
import styled, { css } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import ContentsBox from '../components/ContentsBox';

export default function Home() {
    return (
        <>
          <Grid container>
            <Box style={{padding: '25px', height: '8vh'}}>
              <Typography style={{color: "#424242"}} variant="span" gutterBottom>현재 Da Yeong님의 자산</Typography>
              <Typography style={{color: "#fca311", fontWeight: "700"}} variant="h5" gutterBottom>￦ 5,000,000</Typography>
            </Box>
            <ContentsBox></ContentsBox>
          </Grid>
        </>      
    );
}