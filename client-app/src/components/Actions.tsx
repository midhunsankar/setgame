import { useTheme } from "@mui/material";
import type { Card } from "../models/card";
import CardsService from "../services/cards.service";
import { useEffect } from "react";


function Actions({ cards = [] }: { cards?: Card[] }) {
    const cardsService = new CardsService();
    const theme = useTheme();

    useEffect(() => {
        shuffleCards();
    }, []);

    function shuffleCards() {
        cardsService.shuffleCards();
    }

    function solveCards() {
        cardsService.solveSet(cards);
    }

    function checkSelectedCards(): void {
        const isMatch = cardsService.checkMatch();
        console.log(`Match found: ${isMatch}`);
    }
    
  return (
    <div className="flex flex-col gap-2">
      <button onClick={shuffleCards} className="btn btn-secondary" style={{ backgroundColor: theme.palette.warning.light, color: theme.palette.success.contrastText, border: '1px solid #fff' }}>Shuffle</button>
      &nbsp;
      <button onClick={solveCards} className="btn btn-primary" style={{ backgroundColor: theme.palette.success.light, color: theme.palette.success.contrastText, border: '1px solid #fff' }}>Solve</button>
      &nbsp;
      <button onClick={checkSelectedCards} className="btn btn-primary" style={{ backgroundColor: theme.palette.success.light, color: theme.palette.success.contrastText, border: '1px solid #fff' }}>Set</button>

    </div>
  );
}
export default Actions;