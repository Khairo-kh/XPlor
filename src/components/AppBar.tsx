import { FC } from 'react';
import Link from "next/link";


import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';

export const AppBar: FC = props => {
  const { autoConnect, setAutoConnect } = useAutoConnect();

  return (
    <div className='w-full flex align-center justify-between p-3.5 mb-8'>
     <h2 className="text-2xl font-bold" >XPlor 🔎 <span className='text-gray-500'>Solana Block Explorer</span></h2>
     <div className='gap-3 flex'>
     <select className='text-black rounded'name="environment" id="environment">
       <option value="devnet">Devnet</option>
       <option value="mainnet">Mainnet</option>
  </select>
     <button  className='bg-green-500'style={{borderRadius:'5px',padding:'10px',cursor:'pointer',color:'black'}}>Connect Wallet</button>
     </div>
    </div>
  );
};
