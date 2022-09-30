import '../styles/globals.css';
import Layout from 'components/layout/Layout';
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider } from '@emotion/react';


function MyApp({ Component, pageProps }) {
  return(
    <CacheProvider value={emotionCache}>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CacheProvider>
  )
}

export default MyApp
