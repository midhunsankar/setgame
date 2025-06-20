import { Grid, Container, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import './App.css'
import CardsService from './services/cards.service'
import GridPlaceHolder from './components/GridPlaceHolder'
import Actions from './components/Actions'
import type { Card } from './models/card'
import Matches from './components/Matches'

function App() {

  const [cards, setCards] = useState(([]) as Card[]);
  const [matches, setMatches] = useState<Array<Card[]> | undefined>(undefined);
  const theme = useTheme();
  const cardsSubscription = CardsService.getCards();
  const matchesSubscription = CardsService.getMatchingSets();

  useEffect(() => {
    cardsSubscription
      .subscribe((loadedCards: Card[]) => {
      setCards(loadedCards);
      setMatches(undefined); // Reset matches when new cards are loaded
    });
    matchesSubscription
      .subscribe((matches: Array<Card[]>) => {
        setMatches(matches);
      });
    
  }, []);

 
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: theme.palette.background.default, scrollBehavior: 'smooth' }}
      >
        <Container
          maxWidth="sm"
          style={{
            backgroundColor: theme.palette.primary.main,
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            minHeight: '680px',
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>
            <h2 style={{ color: theme.palette.primary.contrastText }}>Welcome!!</h2>
              <p style={{ color: theme.palette.primary.contrastText }}>
                Solve your set game here.
              </p>
          </div>
          <div>
          <GridPlaceHolder cards={cards} />
          </div>
          <div>
          <Actions cards={cards} />
          </div>
          <div>
          <Matches matches={matches} />
          </div>
        </Container>
      </Grid>
    </>
  )
}

export default App

