
import { useState } from 'react'
import '../App.css'
import type { Card } from '../models/card'
import CardsService from '../services/cards.service';


function GridPlaceHolder({ cards = [] }: { cards?: Card[] }) {
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    
    function selectCard(card: Card): void {
        // Check if the card is already selected
        if (selectedCards.some(selectedCard => selectedCard.id === card.id)) {
            // If it is, remove it from the selected cards
            const updatedSelectedCards = selectedCards.filter(selectedCard => selectedCard.id !== card.id);
            CardsService.updateSelectedCards(updatedSelectedCards);
            setSelectedCards(CardsService.getSelectedCards());
            return;
        }
        
        let updatedSelectedCards = selectedCards;

        // if the slected cards are already 3, remove the last one
        if (selectedCards.length === 3) {
            updatedSelectedCards = updatedSelectedCards.slice(0, 2); // Remove the last card
        }

        updatedSelectedCards.push(card);
        CardsService.updateSelectedCards(updatedSelectedCards);
        setSelectedCards(CardsService.getSelectedCards());
    }

    function getClassName(card: Card): string {
        if (selectedCards.some(selectedCard => selectedCard.id === card.id)) {
            return 'set-card selected';
        }
        return 'set-card'
    }

    return (
        <div className='set-placeholder' >
            {cards.map(card => (
                <div className={getClassName(card)} key={card.id} onClick={() => selectCard(card)}>
                    <img
                        src={`/images/cards/card (${card.id}).png`}
                        alt={`${card.color} ${card.shape} ${card.shading}`}
                        className='set-card-image'
                        ></img>
                </div>
            ))}
        </div>
    );
}

export default GridPlaceHolder;