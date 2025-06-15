package model

type Color int

const (
	Red Color = iota
	Green
	Purple
)

type Shape int8

const (
	Diamond Shape = 0
	Oval    Shape = 1
	Swiggle Shape = 2
)

type Shading int8

const (
	Solid   Shading = 0
	Striped Shading = 1
	Plain   Shading = 2
)

type Card struct {
	ID      int16
	Color   Color
	Shape   Shape
	Shading Shading
	Number  int8
}
