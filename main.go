package main

import (
	"fmt"
	"main/model"
	"os"
	"os/signal"
	"syscall"
)

var deck map[uint16]model.Card
var cardMap []int

func main() {

	prepareCards()
	prepareCardMap()

	println("\n")
	println("0: show cards.")
	println("1: solve set.")
	println("ctrl + c: exit.")

	// loop and read key presses
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, os.Interrupt, syscall.SIGTERM)
	msg := make(chan string, 1)
	go func() {
		// Receive input in a loop
		for {
			var s string
			fmt.Scan(&s)
			// Send what we read over the channel
			msg <- s
		}
	}()
loop:
	for {
		select {
		case <-sigs:
			fmt.Println("Got shutdown, exiting")
			// Break out of the outer for statement and end the program
			break loop
		case s := <-msg:
			// allowed option are 0 and 1
			switch s {
			case "0":
				println("Showing cards.")
				showCards()
			case "1":
				println("Solving set.")
			default:
				println("Unknown command:", s)
			}
		}
	}
}

func prepareCards() {
	// save all cards in an array.
	deck = map[uint16]model.Card{
		// The first card is a placeholder with ID 0, Count 0, and all attributes set to default.
		// This card is not used in the game but serves as a starting point.
		0: {ID: 0, Count: 0, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},

		// The following cards are defined with unique IDs, counts, colors, shapes, and shadings.
		// Each card represents a unique combination of these attributes.
		1:  {ID: 1, Count: 1, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},
		2:  {ID: 2, Count: 1, Color: model.Red, Shape: model.Diamond, Shading: model.Striped},
		3:  {ID: 3, Count: 1, Color: model.Red, Shape: model.Diamond, Shading: model.Plain},
		4:  {ID: 4, Count: 1, Color: model.Red, Shape: model.Oval, Shading: model.Solid},
		5:  {ID: 5, Count: 1, Color: model.Red, Shape: model.Oval, Shading: model.Striped},
		6:  {ID: 6, Count: 1, Color: model.Red, Shape: model.Oval, Shading: model.Plain},
		7:  {ID: 7, Count: 1, Color: model.Red, Shape: model.Swiggle, Shading: model.Solid},
		8:  {ID: 8, Count: 1, Color: model.Red, Shape: model.Swiggle, Shading: model.Striped},
		9:  {ID: 9, Count: 1, Color: model.Red, Shape: model.Swiggle, Shading: model.Plain},
		10: {ID: 10, Count: 2, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},
		11: {ID: 11, Count: 2, Color: model.Red, Shape: model.Diamond, Shading: model.Striped},
		12: {ID: 12, Count: 2, Color: model.Red, Shape: model.Diamond, Shading: model.Plain},
		13: {ID: 13, Count: 2, Color: model.Red, Shape: model.Oval, Shading: model.Solid},
		14: {ID: 14, Count: 2, Color: model.Red, Shape: model.Oval, Shading: model.Striped},
		15: {ID: 15, Count: 2, Color: model.Red, Shape: model.Oval, Shading: model.Plain},
		16: {ID: 16, Count: 2, Color: model.Red, Shape: model.Swiggle, Shading: model.Solid},
		17: {ID: 17, Count: 2, Color: model.Red, Shape: model.Swiggle, Shading: model.Striped},
		18: {ID: 18, Count: 2, Color: model.Red, Shape: model.Swiggle, Shading: model.Plain},
		19: {ID: 19, Count: 3, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},
		20: {ID: 20, Count: 3, Color: model.Red, Shape: model.Diamond, Shading: model.Striped},
		21: {ID: 21, Count: 3, Color: model.Red, Shape: model.Diamond, Shading: model.Plain},
		22: {ID: 22, Count: 3, Color: model.Red, Shape: model.Oval, Shading: model.Solid},
		23: {ID: 23, Count: 3, Color: model.Red, Shape: model.Oval, Shading: model.Striped},
		24: {ID: 24, Count: 3, Color: model.Red, Shape: model.Oval, Shading: model.Plain},
		25: {ID: 25, Count: 3, Color: model.Red, Shape: model.Swiggle, Shading: model.Solid},
		26: {ID: 26, Count: 3, Color: model.Red, Shape: model.Swiggle, Shading: model.Striped},
		27: {ID: 27, Count: 3, Color: model.Red, Shape: model.Swiggle, Shading: model.Plain},
		28: {ID: 28, Count: 1, Color: model.Green, Shape: model.Diamond, Shading: model.Solid},
		29: {ID: 29, Count: 1, Color: model.Green, Shape: model.Diamond, Shading: model.Striped},
		30: {ID: 30, Count: 1, Color: model.Green, Shape: model.Diamond, Shading: model.Plain},
		31: {ID: 31, Count: 1, Color: model.Green, Shape: model.Oval, Shading: model.Solid},
		32: {ID: 32, Count: 1, Color: model.Green, Shape: model.Oval, Shading: model.Striped},
		33: {ID: 33, Count: 1, Color: model.Green, Shape: model.Oval, Shading: model.Plain},
		34: {ID: 34, Count: 1, Color: model.Green, Shape: model.Swiggle, Shading: model.Solid},
		35: {ID: 35, Count: 1, Color: model.Green, Shape: model.Swiggle, Shading: model.Striped},
		36: {ID: 36, Count: 1, Color: model.Green, Shape: model.Swiggle, Shading: model.Plain},
		37: {ID: 37, Count: 2, Color: model.Green, Shape: model.Diamond, Shading: model.Solid},
		38: {ID: 38, Count: 2, Color: model.Green, Shape: model.Diamond, Shading: model.Striped},
		39: {ID: 39, Count: 2, Color: model.Green, Shape: model.Diamond, Shading: model.Plain},
		40: {ID: 40, Count: 2, Color: model.Green, Shape: model.Oval, Shading: model.Solid},
		41: {ID: 41, Count: 2, Color: model.Green, Shape: model.Oval, Shading: model.Striped},
		42: {ID: 42, Count: 2, Color: model.Green, Shape: model.Oval, Shading: model.Plain},
		43: {ID: 43, Count: 2, Color: model.Green, Shape: model.Swiggle, Shading: model.Solid},
		44: {ID: 44, Count: 2, Color: model.Green, Shape: model.Swiggle, Shading: model.Striped},
		45: {ID: 45, Count: 2, Color: model.Green, Shape: model.Swiggle, Shading: model.Plain},
		46: {ID: 46, Count: 3, Color: model.Green, Shape: model.Diamond, Shading: model.Solid},
		47: {ID: 47, Count: 3, Color: model.Green, Shape: model.Diamond, Shading: model.Striped},
		48: {ID: 48, Count: 3, Color: model.Green, Shape: model.Diamond, Shading: model.Plain},
		49: {ID: 49, Count: 3, Color: model.Green, Shape: model.Oval, Shading: model.Solid},
		50: {ID: 50, Count: 3, Color: model.Green, Shape: model.Oval, Shading: model.Striped},
		51: {ID: 51, Count: 3, Color: model.Green, Shape: model.Oval, Shading: model.Plain},
		52: {ID: 52, Count: 3, Color: model.Green, Shape: model.Swiggle, Shading: model.Solid},
		53: {ID: 53, Count: 3, Color: model.Green, Shape: model.Swiggle, Shading: model.Striped},
		54: {ID: 54, Count: 3, Color: model.Green, Shape: model.Swiggle, Shading: model.Plain},
		55: {ID: 55, Count: 1, Color: model.Purple, Shape: model.Diamond, Shading: model.Solid},
		56: {ID: 56, Count: 1, Color: model.Purple, Shape: model.Diamond, Shading: model.Striped},
		57: {ID: 57, Count: 1, Color: model.Purple, Shape: model.Diamond, Shading: model.Plain},
		58: {ID: 58, Count: 1, Color: model.Purple, Shape: model.Oval, Shading: model.Solid},
		59: {ID: 59, Count: 1, Color: model.Purple, Shape: model.Oval, Shading: model.Striped},
		60: {ID: 60, Count: 1, Color: model.Purple, Shape: model.Oval, Shading: model.Plain},
		61: {ID: 61, Count: 1, Color: model.Purple, Shape: model.Swiggle, Shading: model.Solid},
		62: {ID: 62, Count: 1, Color: model.Purple, Shape: model.Swiggle, Shading: model.Striped},
		63: {ID: 63, Count: 1, Color: model.Purple, Shape: model.Swiggle, Shading: model.Plain},
		64: {ID: 64, Count: 2, Color: model.Purple, Shape: model.Diamond, Shading: model.Solid},
		65: {ID: 65, Count: 2, Color: model.Purple, Shape: model.Diamond, Shading: model.Striped},
		66: {ID: 66, Count: 2, Color: model.Purple, Shape: model.Diamond, Shading: model.Plain},
		67: {ID: 67, Count: 2, Color: model.Purple, Shape: model.Oval, Shading: model.Solid},
		68: {ID: 68, Count: 2, Color: model.Purple, Shape: model.Oval, Shading: model.Striped},
		69: {ID: 69, Count: 2, Color: model.Purple, Shape: model.Oval, Shading: model.Plain},
		70: {ID: 70, Count: 2, Color: model.Purple, Shape: model.Swiggle, Shading: model.Solid},
		71: {ID: 71, Count: 2, Color: model.Purple, Shape: model.Swiggle, Shading: model.Striped},
		72: {ID: 72, Count: 2, Color: model.Purple, Shape: model.Swiggle, Shading: model.Plain},
		73: {ID: 73, Count: 3, Color: model.Purple, Shape: model.Diamond, Shading: model.Solid},
		74: {ID: 74, Count: 3, Color: model.Purple, Shape: model.Diamond, Shading: model.Striped},
		75: {ID: 75, Count: 3, Color: model.Purple, Shape: model.Diamond, Shading: model.Plain},
		76: {ID: 76, Count: 3, Color: model.Purple, Shape: model.Oval, Shading: model.Solid},
		77: {ID: 77, Count: 3, Color: model.Purple, Shape: model.Oval, Shading: model.Striped},
		78: {ID: 78, Count: 3, Color: model.Purple, Shape: model.Oval, Shading: model.Plain},
		79: {ID: 79, Count: 3, Color: model.Purple, Shape: model.Swiggle, Shading: model.Solid},
		80: {ID: 80, Count: 3, Color: model.Purple, Shape: model.Swiggle, Shading: model.Striped},
		81: {ID: 81, Count: 3, Color: model.Purple, Shape: model.Swiggle, Shading: model.Plain},
	}
}

func prepareCardMap() {
	len := len(deck)
	var i uint16
	for i = 1; int(i) < len; i++ {
		if checkSet(i, i+1, i+2) {
			mapID := i*1000 + (i+1)*100 + (i + 2)
			cardMap = append(cardMap, int(mapID))
		}
	}
}

func checkSet(card1, card2, card3 uint16) bool {
	return false
}

func showCards() {
	for _, card := range deck {
		fmt.Printf("Card ID: %d, Count: %d, Color: %d, Shape: %d, Shading: %d\n",
			card.ID, card.Count, card.Color, card.Shape, card.Shading)
	}
}
