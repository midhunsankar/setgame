package model

type Color int

const (
	Red Color = iota
	Green
	Purple
)

type Shape int

const (
	Diamond Shape = iota
	Oval
	Swiggle
)

type Shading int

const (
	Solid Shading = iota
	Striped
	Plain
)

type Card struct {
	ID      int16   `json:"id"`
	Color   Color   `json:"color"`
	Shape   Shape   `json:"shape"`
	Shading Shading `json:"shading"`
	Count   int8    `json:"count"`
}
