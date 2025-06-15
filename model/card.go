package model

type Color int

const (
	NoColor Color = -1 // Represents no color, used for empty cards
	Red     Color = 0
	Green   Color = 1
	Purple  Color = 2
)

type Shape int8

const (
	NoShape Shape = -1 // Represents no shape, used for empty cards
	Diamond Shape = 0
	Oval    Shape = 1
	Swiggle Shape = 2
)

type Shading int8

const (
	NoShading Shading = -1 // Represents no shading, used for empty cards
	Solid     Shading = 0
	Striped   Shading = 1
	Plain     Shading = 2
)

type Card struct {
	ID      int16
	Color   Color
	Shape   Shape
	Shading Shading
	Number  int8
}
