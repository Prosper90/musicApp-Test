import '../styles/globals.css';
import Layout from 'components/layout/Layout';
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider } from '@emotion/react';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


function MyApp(props) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;



  return(
    <CacheProvider value={emotionCache}>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CacheProvider>
  )
}

export default MyApp
