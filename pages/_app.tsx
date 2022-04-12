import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import Layout from '../src/components/Layout/Layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <ThemeProvider defaultTheme='dark' attribute='class'>
        <Layout>
          <Component {...pageProps} />
        </Layout> 
      </ThemeProvider>
       
    </ThirdwebProvider>
  )
}

export default MyApp
