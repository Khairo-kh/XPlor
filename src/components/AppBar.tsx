import { FC } from 'react';
import Link from "next/link";


import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';

export const AppBar: FC = props => {
  const { autoConnect, setAutoConnect } = useAutoConnect();

  return (
    <div className='w-full flex align-center justify-between p-3.5'>
     <h2 className="" style={{color:'green'}}>SOLBLOCKEXPLORER</h2>
     <button  style={{borderRadius:'5px',backgroundColor:'green',padding:'15px',cursor:'pointer',color:'black'}}>Connect Wallet</button>
     
    </div>
  );
};
