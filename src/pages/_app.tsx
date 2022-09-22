import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import SolCard from 'components/SolCard';
import Notifications from '../components/Notification'
import SupplyDataCard from 'components/SupplyDataCard';
import SolanaPriceCard from 'components/SolanaPriceCard';
import ClusterCard from 'components/ClusterCard';

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
              
              <AppBar/>
              <div className='w-full flex  mt-5 mx-auto justify-center'>
                {/* <h2 className='mx-auto my-5 text-2xl' style={{color:'white'}}> Solana Blockchain Explorer</h2> */}
                <input placeholder='Search transactions, programs, blocks' className=' outline-none p-3   w-9/12 relative' style={{color:'black'}}/>
                <button className='bg-green-500  p-2 border-none cursor-pointer'>Search</button>
              </div>
              <div className='flex align-center  w-3/4  ' style={{margin:'30px auto'}}>
              <SolanaPriceCard/>
              {/* <SupplyDataCard/> */}
                
              </div>
               <ClusterCard/>
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
