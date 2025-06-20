import type { Card } from "../models/card";

// interface MatchesProps {
//   matches: Array<Card[]>;
// }

function Matches({ matches }: { matches: Array<Card[]> | undefined }) {
    if(!matches)
    {
        return(
            <div className="matches">
            </div>
        );
    }

    if(matches.length === 0) {
        return (
            <div className="matches">
            <h2>No Matches Found</h2>
            <p>There are currently no matches to display.</p>
            </div>
        );
    }
    else {
        return (
            <div className="matches">
            <h2>Matches</h2>
            <p>Here you can view your matches.</p>
            {/* Add match details here */}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {matches.map((match, index) => (
                    <li key={index}>
                        <p>Match #{index + 1}</p>
                        {match.map(card => (
                            <span key={card.id} className="match-card">
                                <img
                                    src={`/src/assets/cards/card (${card.id}).png`}
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
}

export default Matches;