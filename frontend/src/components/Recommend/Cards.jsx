import React from 'react'
import Card from './Card';
import { CardsData } from './Data';
import './recommend.css';

const Cards = () => {
    return(
        <div className='Cards'>
            {CardsData.map((card, id)=>{
                return(
                    <div >
                        <Card
                        value={card.value}
                        text={card.text}
                        text2={card.text2}
                        elec={card.elec}
                        fuel={card.fuel}
                        gas={card.gas}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Cards