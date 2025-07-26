import type { Card } from "../models/card";

function Matches({ matches }: { matches: Array<Card[]> | undefined }) {
    if(!matches)
    {
        return(
            <div className="matches">
            </div>
        );
    }

        return (
            <div className="matches">
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {matches.map((match, index) => (
                    <li key={index}>
                        <p>Match #{index + 1}</p>
                        {match.map(card => (
                            <span key={card.id} className="match-card">
                                <img
                                    src={`/images/cards/card (${card.id}).png`}
                                    alt={`${card.color} ${card.shape} ${card.shading}`}
                                    className='set-card-image'
                                />
                            </span>
                        ))}
                    </li>
                ))}
            </ul>
            </div>
    );
}

export default Matches;