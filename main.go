package main

import (
	"fmt"
	"main/model"
	"math/rand"
	"os"
	"os/signal"
	"syscall"
	"time"
)

var deck map[uint16]model.Card
var cardMap []int
var grid []int

func main() {

	prepareCards()
	//testPrepareCards() // for testing purposes only, use prepareCards() for the full deck.
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
				println("Showing cards.\n")
				showGrid()
			case "1":
				println("Solving set.")
				findSets()
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
		0: {ID: 0, Number: 0, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},

		// The following cards are defined with unique IDs, counts, colors, shapes, and shadings.
		// Each card represents a unique combination of these attributes.
		1:  {ID: 1, Number: 1, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},
		2:  {ID: 2, Number: 1, Color: model.Red, Shape: model.Diamond, Shading: model.Striped},
		3:  {ID: 3, Number: 1, Color: model.Red, Shape: model.Diamond, Shading: model.Plain},
		4:  {ID: 4, Number: 1, Color: model.Red, Shape: model.Oval, Shading: model.Solid},
		5:  {ID: 5, Number: 1, Color: model.Red, Shape: model.Oval, Shading: model.Striped},
		6:  {ID: 6, Number: 1, Color: model.Red, Shape: model.Oval, Shading: model.Plain},
		7:  {ID: 7, Number: 1, Color: model.Red, Shape: model.Swiggle, Shading: model.Solid},
		8:  {ID: 8, Number: 1, Color: model.Red, Shape: model.Swiggle, Shading: model.Striped},
		9:  {ID: 9, Number: 1, Color: model.Red, Shape: model.Swiggle, Shading: model.Plain},
		10: {ID: 10, Number: 2, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},
		11: {ID: 11, Number: 2, Color: model.Red, Shape: model.Diamond, Shading: model.Striped},
		12: {ID: 12, Number: 2, Color: model.Red, Shape: model.Diamond, Shading: model.Plain},
		13: {ID: 13, Number: 2, Color: model.Red, Shape: model.Oval, Shading: model.Solid},
		14: {ID: 14, Number: 2, Color: model.Red, Shape: model.Oval, Shading: model.Striped},
		15: {ID: 15, Number: 2, Color: model.Red, Shape: model.Oval, Shading: model.Plain},
		16: {ID: 16, Number: 2, Color: model.Red, Shape: model.Swiggle, Shading: model.Solid},
		17: {ID: 17, Number: 2, Color: model.Red, Shape: model.Swiggle, Shading: model.Striped},
		18: {ID: 18, Number: 2, Color: model.Red, Shape: model.Swiggle, Shading: model.Plain},
		19: {ID: 19, Number: 3, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},
		20: {ID: 20, Number: 3, Color: model.Red, Shape: model.Diamond, Shading: model.Striped},
		21: {ID: 21, Number: 3, Color: model.Red, Shape: model.Diamond, Shading: model.Plain},
		22: {ID: 22, Number: 3, Color: model.Red, Shape: model.Oval, Shading: model.Solid},
		23: {ID: 23, Number: 3, Color: model.Red, Shape: model.Oval, Shading: model.Striped},
		24: {ID: 24, Number: 3, Color: model.Red, Shape: model.Oval, Shading: model.Plain},
		25: {ID: 25, Number: 3, Color: model.Red, Shape: model.Swiggle, Shading: model.Solid},
		26: {ID: 26, Number: 3, Color: model.Red, Shape: model.Swiggle, Shading: model.Striped},
		27: {ID: 27, Number: 3, Color: model.Red, Shape: model.Swiggle, Shading: model.Plain},
		28: {ID: 28, Number: 1, Color: model.Green, Shape: model.Diamond, Shading: model.Solid},
		29: {ID: 29, Number: 1, Color: model.Green, Shape: model.Diamond, Shading: model.Striped},
		30: {ID: 30, Number: 1, Color: model.Green, Shape: model.Diamond, Shading: model.Plain},
		31: {ID: 31, Number: 1, Color: model.Green, Shape: model.Oval, Shading: model.Solid},
		32: {ID: 32, Number: 1, Color: model.Green, Shape: model.Oval, Shading: model.Striped},
		33: {ID: 33, Number: 1, Color: model.Green, Shape: model.Oval, Shading: model.Plain},
		34: {ID: 34, Number: 1, Color: model.Green, Shape: model.Swiggle, Shading: model.Solid},
		35: {ID: 35, Number: 1, Color: model.Green, Shape: model.Swiggle, Shading: model.Striped},
		36: {ID: 36, Number: 1, Color: model.Green, Shape: model.Swiggle, Shading: model.Plain},
		37: {ID: 37, Number: 2, Color: model.Green, Shape: model.Diamond, Shading: model.Solid},
		38: {ID: 38, Number: 2, Color: model.Green, Shape: model.Diamond, Shading: model.Striped},
		39: {ID: 39, Number: 2, Color: model.Green, Shape: model.Diamond, Shading: model.Plain},
		40: {ID: 40, Number: 2, Color: model.Green, Shape: model.Oval, Shading: model.Solid},
		41: {ID: 41, Number: 2, Color: model.Green, Shape: model.Oval, Shading: model.Striped},
		42: {ID: 42, Number: 2, Color: model.Green, Shape: model.Oval, Shading: model.Plain},
		43: {ID: 43, Number: 2, Color: model.Green, Shape: model.Swiggle, Shading: model.Solid},
		44: {ID: 44, Number: 2, Color: model.Green, Shape: model.Swiggle, Shading: model.Striped},
		45: {ID: 45, Number: 2, Color: model.Green, Shape: model.Swiggle, Shading: model.Plain},
		46: {ID: 46, Number: 3, Color: model.Green, Shape: model.Diamond, Shading: model.Solid},
		47: {ID: 47, Number: 3, Color: model.Green, Shape: model.Diamond, Shading: model.Striped},
		48: {ID: 48, Number: 3, Color: model.Green, Shape: model.Diamond, Shading: model.Plain},
		49: {ID: 49, Number: 3, Color: model.Green, Shape: model.Oval, Shading: model.Solid},
		50: {ID: 50, Number: 3, Color: model.Green, Shape: model.Oval, Shading: model.Striped},
		51: {ID: 51, Number: 3, Color: model.Green, Shape: model.Oval, Shading: model.Plain},
		52: {ID: 52, Number: 3, Color: model.Green, Shape: model.Swiggle, Shading: model.Solid},
		53: {ID: 53, Number: 3, Color: model.Green, Shape: model.Swiggle, Shading: model.Striped},
		54: {ID: 54, Number: 3, Color: model.Green, Shape: model.Swiggle, Shading: model.Plain},
		55: {ID: 55, Number: 1, Color: model.Purple, Shape: model.Diamond, Shading: model.Solid},
		56: {ID: 56, Number: 1, Color: model.Purple, Shape: model.Diamond, Shading: model.Striped},
		57: {ID: 57, Number: 1, Color: model.Purple, Shape: model.Diamond, Shading: model.Plain},
		58: {ID: 58, Number: 1, Color: model.Purple, Shape: model.Oval, Shading: model.Solid},
		59: {ID: 59, Number: 1, Color: model.Purple, Shape: model.Oval, Shading: model.Striped},
		60: {ID: 60, Number: 1, Color: model.Purple, Shape: model.Oval, Shading: model.Plain},
		61: {ID: 61, Number: 1, Color: model.Purple, Shape: model.Swiggle, Shading: model.Solid},
		62: {ID: 62, Number: 1, Color: model.Purple, Shape: model.Swiggle, Shading: model.Striped},
		63: {ID: 63, Number: 1, Color: model.Purple, Shape: model.Swiggle, Shading: model.Plain},
		64: {ID: 64, Number: 2, Color: model.Purple, Shape: model.Diamond, Shading: model.Solid},
		65: {ID: 65, Number: 2, Color: model.Purple, Shape: model.Diamond, Shading: model.Striped},
		66: {ID: 66, Number: 2, Color: model.Purple, Shape: model.Diamond, Shading: model.Plain},
		67: {ID: 67, Number: 2, Color: model.Purple, Shape: model.Oval, Shading: model.Solid},
		68: {ID: 68, Number: 2, Color: model.Purple, Shape: model.Oval, Shading: model.Striped},
		69: {ID: 69, Number: 2, Color: model.Purple, Shape: model.Oval, Shading: model.Plain},
		70: {ID: 70, Number: 2, Color: model.Purple, Shape: model.Swiggle, Shading: model.Solid},
		71: {ID: 71, Number: 2, Color: model.Purple, Shape: model.Swiggle, Shading: model.Striped},
		72: {ID: 72, Number: 2, Color: model.Purple, Shape: model.Swiggle, Shading: model.Plain},
		73: {ID: 73, Number: 3, Color: model.Purple, Shape: model.Diamond, Shading: model.Solid},
		74: {ID: 74, Number: 3, Color: model.Purple, Shape: model.Diamond, Shading: model.Striped},
		75: {ID: 75, Number: 3, Color: model.Purple, Shape: model.Diamond, Shading: model.Plain},
		76: {ID: 76, Number: 3, Color: model.Purple, Shape: model.Oval, Shading: model.Solid},
		77: {ID: 77, Number: 3, Color: model.Purple, Shape: model.Oval, Shading: model.Striped},
		78: {ID: 78, Number: 3, Color: model.Purple, Shape: model.Oval, Shading: model.Plain},
		79: {ID: 79, Number: 3, Color: model.Purple, Shape: model.Swiggle, Shading: model.Solid},
		80: {ID: 80, Number: 3, Color: model.Purple, Shape: model.Swiggle, Shading: model.Striped},
		81: {ID: 81, Number: 3, Color: model.Purple, Shape: model.Swiggle, Shading: model.Plain},
	}
}

func prepareCardMap() {
	count := 0
	len := len(deck) - 1 // as the first card is a placeholder and not used in the game.
	var i uint16
	for i = 1; int(i) < (len); i++ {
		for j := i + 1; j < uint16(len); j++ {
			for k := j + 1; k <= uint16(len); k++ {
				if checkSet(i, j, k) {
					mapID := i*100 + j*10 + k
					cardMap = append(cardMap, int(mapID))
					count++
				}
			}
		}
	}
}

func showGrid() {
	// This function is for displaying the grid of cards.
	// initialize the grid with 12 empty slots.
	grid = make([]int, 12)
	// take a random number of cards from the deck and fill the grid.
	rand.Seed(time.Now().UnixNano())
	deckSize := len(deck) - 1 // exclude placeholder card
	for i := 0; i < 12; i++ {
		// get a random card ID from the deck.
		randomIndex := rand.Intn(deckSize) + 1 // IDs start from 1
		grid[i] = randomIndex
	}

	// Print the grid in a 3x4 format.
	for i := 0; i < 12; i++ {
		print(" ", grid[i])
		if (i+1)%3 == 0 {
			println("\n")
		}
	}
}

func findSets() {
	// sort the grid.
	sortedGrid := make([]int, len(grid))
	copy(sortedGrid, grid)
	for i := 0; i < len(sortedGrid)-1; i++ {
		for j := i + 1; j < len(sortedGrid); j++ {
			if sortedGrid[i] > sortedGrid[j] {
				sortedGrid[i], sortedGrid[j] = sortedGrid[j], sortedGrid[i]
			}
		}
	}
	// find all sets in the sorted grid.
	for i := 0; i < len(sortedGrid)-2; i++ {
		index := sortedGrid[i]*100 + sortedGrid[i+1]*10 + sortedGrid[i+2]
		if contains(cardMap, index) {
			fmt.Printf("Found set: %d, %d, %d\n", sortedGrid[i], sortedGrid[i+1], sortedGrid[i+2])
		}
	}
}

func checkSet(card1, card2, card3 uint16) bool {
	cardA := deck[card1]
	cardB := deck[card2]
	cardC := deck[card3]

	// Check if the three cards form a valid set
	// A valid set must have either all attributes the same or all different for each attribute.
	// check for same or different attributes

	validShape := false
	validColor := false
	validShading := false
	validNumber := false
	if cardA.Shape == cardB.Shape && cardB.Shape == cardC.Shape {
		validShape = true
	} else {
		if cardA.Shape != cardB.Shape && cardB.Shape != cardC.Shape && cardA.Shape != cardC.Shape {
			validShape = true
		}
	}
	if cardA.Color == cardB.Color && cardB.Color == cardC.Color {
		validColor = true
	} else {
		if cardA.Color != cardB.Color && cardB.Color != cardC.Color && cardA.Color != cardC.Color {
			validColor = true
		}
	}

	if cardA.Shading == cardB.Shading && cardB.Shading == cardC.Shading {
		validShading = true
	} else {
		if cardA.Shading != cardB.Shading && cardB.Shading != cardC.Shading && cardA.Shading != cardC.Shading {
			validShading = true
		}
	}

	if cardA.Number == cardB.Number && cardB.Number == cardC.Number {
		validNumber = true
	} else {
		if cardA.Number != cardB.Number && cardB.Number != cardC.Number && cardA.Number != cardC.Number {
			validNumber = true
		}
	}

	return validShape && validColor && validShading && validNumber
}

func testPrepareCards() {
	// This function is for testing purposes only.
	// It prepares a smaller deck of cards for testing the set finding logic.
	deck = map[uint16]model.Card{
		0: {ID: 0, Number: 0, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},
		1: {ID: 1, Number: 1, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},
		2: {ID: 2, Number: 1, Color: model.Green, Shape: model.Oval, Shading: model.Striped},
		3: {ID: 3, Number: 1, Color: model.Purple, Shape: model.Swiggle, Shading: model.Plain},
		4: {ID: 4, Number: 2, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},
		5: {ID: 5, Number: 2, Color: model.Green, Shape: model.Oval, Shading: model.Striped},
		6: {ID: 6, Number: 2, Color: model.Purple, Shape: model.Swiggle, Shading: model.Plain},
		7: {ID: 7, Number: 1, Color: model.Red, Shape: model.Diamond, Shading: model.Solid},
		8: {ID: 8, Number: 2, Color: model.Red, Shape: model.Oval, Shading: model.Striped},
		9: {ID: 9, Number: 3, Color: model.Red, Shape: model.Swiggle, Shading: model.Plain},
	}
}

func showCards() {
	for _, card := range deck {
		fmt.Printf("Card ID: %d, Number: %d, Color: %d, Shape: %d, Shading: %d\n",
			card.ID, card.Number, card.Color, card.Shape, card.Shading)
	}
}

func showCardMap() {
	for _, cardID := range cardMap {
		fmt.Printf("Card Map ID: %d\n", cardID)
	}
	println("Total sets found:", len(cardMap))
}

// contains checks if a slice of ints contains a specific int value.
func contains(slice []int, value int) bool {
	for _, v := range slice {
		if v == value {
			return true
		}
	}
	return false
}
