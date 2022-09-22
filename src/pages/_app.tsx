import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import SolCard from 'components/SolCard';
import Notifications from '../components/Notification'

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');



const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
          <Head>
            <title>Block Explorer</title>
          </Head>

          <ContextProvider>
            <div className="flex flex-col h-screen bg-black" >
              {/*<Notifications />*/}
              <AppBar/>
              <div className='w-full flex flex-col mt-5 '>
                <h2 className='mx-auto my-5 text-2xl' style={{color:'white'}}> Solana Blockchain Explorer</h2>
                <input placeholder='Search transactions, programs, blocks' className='mx-auto outline-none p-5 rounded-md flex-1 w-9/12' style={{color:'black'}}/>
              </div>
              <div className='flex align-center justify-between w-3/4 ' style={{margin:'30px auto'}}>
                <SolCard cardTitle='Total Circulating Supply' cardTitleNumber='529,495,201.3788' cardTitlePercentage='90%'/>
                <SolCard cardTitle='Total Staked' cardTitleNumber='398,667,896.3672' cardTitlePercentage='70%'/>
                <SolCard cardTitle='Total Price' cardTitleNumber='$200' cardTitlePercentage='+0.9'/>
                <SolCard cardTitle='My Wallet SOL' cardTitleNumber='60 SOL' cardTitlePercentage='-'/>
              </div>
              {/*<ContentContainer>
                <Component {...pageProps} />
    </ContentContainer>*/}
              {/*<Footer/>*/}
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
