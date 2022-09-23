import React from 'react';
import { FC } from 'react';




type CardProps = {
  cardTitle: string;
  cardTitleNumber :string;
  cardTitlePercentage :string;
};
const SolCard = (props: CardProps) => {
  return (
    <div className='flex flex-col bg-white p-5 rounded-sm' style={{color:'black'}}>
        <h2>{props.cardTitle}</h2>
        <h4 style={{color:'green'}}>{props.cardTitleNumber}</h4>
        <h6>{props.cardTitlePercentage}</h6>
    </div>
  )
}

export default SolCard