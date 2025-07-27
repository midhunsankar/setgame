import { Grid, Container, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import './App.css'
import GridPlaceHolder from './components/GridPlaceHolder'
import Actions from './components/Actions'
import type { Card } from './models/card'
import Matches from './components/Matches'
import Messages from './components/Messages'
import type { Message } from './models/message'
import Factory from './Factory'
import type { ActionStates } from './models/action-states'

function App() {

  const [cards, setCards] = useState(([]) as Card[]);
  const [matches, setMatches] = useState<Array<Card[]> | undefined>(undefined);
  const [message, setMessages] = useState<Message>();
  const [actionStates, setActionStates] = useState<ActionStates>({ enableShuffle: true, enableSolve: true, enableSet: false });
  const theme = useTheme();

  const module = {
    cardsService: Factory.getCardsService(),
    messagesService: Factory.getMessagesService(),
    actionService: Factory.getActionService()
  };


  const cardsSubscription = module.cardsService.getCards();
  const matchesSubscription = module.cardsService.getMatchingSets();
  const messagesSubscription = module.messagesService.getMessages();
  const actionStatesSubscription = module.actionService.getActionStates();

  useEffect(() => {
    cardsSubscription
      .subscribe((loadedCards: Card[]) => {
      setCards(loadedCards);
    });
    matchesSubscription
      .subscribe((matches: Array<Card[]>) => {
        setMatches(matches);
      });
    messagesSubscription
      .subscribe((msg) => {
        setMessages(msg);
      });
    actionStatesSubscription
      .subscribe((states: ActionStates) => {
        setActionStates(states);
      });
    // Initial shuffle of cards
    module.cardsService.shuffleCards();
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
          <GridPlaceHolder cards={cards} actionService={module.actionService} />
          </div>
          <div>
          <Actions cards={cards} actionsService={module.actionService} actionStates={actionStates} />
          </div>
          <Messages message={message} />
          <div>
          <Matches matches={matches} />
          </div>
        </Container>
      </Grid>
    </>
  )
}

export default App

