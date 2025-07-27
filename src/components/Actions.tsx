import { useTheme } from "@mui/material";
import type { Card } from "../models/card";
import type ActionService from "../services/action.service";
import type { ActionStates } from "../models/action-states";

function Actions({ cards = [], actionsService, actionStates }: { cards?: Card[], actionsService: ActionService, actionStates: ActionStates }) {
    const theme = useTheme();

    function shuffleCards() {
        actionsService.shuffleCards();
    }

    function solveCards() {
        actionsService.solveSet(cards);
    }

    function checkSelectedCards(): void {
       const match = actionsService.checkMatch(cards.filter(card => card.selected));
       if (match) {
          actionsService.resetSelectedCards(cards);
       }
    }
    
  return (
    <div className="flex flex-col gap-2">
      <button disabled={!actionStates.enableShuffle} onClick={shuffleCards} className="btn btn-secondary" style={{ backgroundColor: theme.palette.warning.light, color: theme.palette.success.contrastText }}>Shuffle</button>
      &nbsp;
      <button disabled={!actionStates.enableSolve} onClick={solveCards} className="btn btn-primary" style={{ backgroundColor: theme.palette.success.light, color: theme.palette.success.contrastText }}>Solve</button>
      &nbsp;
      <button disabled={!actionStates.enableSet} onClick={checkSelectedCards} className="btn btn-primary" style={{ backgroundColor: theme.palette.success.light, color: theme.palette.success.contrastText }}>Set</button>

    </div>
  );
}
export default Actions;