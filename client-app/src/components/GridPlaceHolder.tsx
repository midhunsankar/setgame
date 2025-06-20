
import { useState } from 'react'
import '../App.css'
import type { Card } from '../models/card'

function GridPlaceHolder({ cards = [] }: { cards?: Card[] }) {
    const [] = useState(0)
    return (
        <div className='set-placeholder' >
            {cards.map(card => (
                <div className='set-card' key={card.id}>
                    <img
                        src={`/src/assets/cards/card (${card.id}).png`}
                        alt={`${card.color} ${card.shape} ${card.shading}`}
                        className='set-card-image'
                        ></img>
                </div>
            ))}
        </div>
    );
}

export default GridPlaceHolder;