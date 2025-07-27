import '../App.css'
import type { Card } from '../models/card'
import ActionService from '../services/action.service';


function GridPlaceHolder({ cards = [], actionService }: { cards?: Card[], actionService: ActionService }) {
   
    function selectCard(card: Card): void {
        actionService.cardSelection(card, cards);
    }

    function getClassName(card: Card): string {
        if (card.selected) {
            return 'set-card selected';
        }
        return 'set-card'
    }

    return (
        <div className='set-placeholder' >
            {cards.map(card => (
                <div className={getClassName(card)} key={card.id} onClick={() => selectCard(card)}>
                    <img
                        src={`./images/cards/card (${card.id}).png`}
                        alt={`${card.color} ${card.shape} ${card.shading}`}
                        className='set-card-image'
                        ></img>
                </div>
            ))}
        </div>
    );
}

export default GridPlaceHolder;