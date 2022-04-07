import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Layout from '../src/components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Layout>
        <Component {...pageProps} />
      </Layout>  
    </ThirdwebProvider>
  )
}

export default MyApp
