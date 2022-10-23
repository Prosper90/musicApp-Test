import React, { useEffect, useContext, useState } from 'react';
import '../styles/globals.css';
import '../styles/maincss.css';
import Layout from 'components/layout/Layout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider } from '@emotion/react';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


function MyApp(props) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;


  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);



  return(
    <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp


MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};