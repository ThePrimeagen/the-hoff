package animation

import (
	"encoding/json"
	"math"

	"github.com/theprimeagen/the-hoff/internal/matrix"
)

// create an enum for the different types of animations
type AnimationType int
type ObjectType int
type InterpolationType int

const (
	InterpolationTypeLinear = iota
	InterpolationTypeQuad
	InterpolationTypeCubic
	InterpolationTypeQuart
	InterpolationTypeQuint
	InterpolationTypeSine
	InterpolationTypeExpo
	InterpolationTypeCirc
	InterpolationTypeElastic
	InterpolationTypeBack
	InterpolationTypeBounce
)

const (
	AnimationTypeTranslate = iota
	AnimationTypeRotate
	AnimationTypeScale
	AnimationTypeOpacity
	AnimationTypeColor
)

// create an object type enum for the different types of objects that can be
// animated.  This will be background, div, or image
const (
	ObjectTypeBackground = iota
	ObjectTypeDiv
	ObjectTypeImage
)

type Animation struct {
	Type              AnimationType     `json:"type"`
	InterpolationType InterpolationType `json:"interpolationType"`
	Offset            int               `json:"offset"`
	Duration          int               `json:"duration"`
}

type TranslateAnimation struct {
	Animation
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

type RotateAnimation struct {
	Animation
	X float64 `json:"x"`
	Y float64 `json:"y"`
	Z float64 `json:"z"`
}

type ScaleAnimation struct {
	Animation
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

type OpacityAnimation struct {
	Animation
	From *float64 `json:"from"`
	To   float64  `json:"to"`
}

type ColorAnimation struct {
	Animation
	From *string `json:"from"`
	To   string  `json:"to"`
}

type AnimationSet struct {
	Id         *int          `json:"id"`
	Type       ObjectType    `json:"type"`
	Animations []interface{} `json:"animations"`
}

// create TranslationAnimation from x and y
func NewTranslateAnimation(x float64, y float64, duration, offset int) TranslateAnimation {
	return TranslateAnimation{
		Animation: Animation{
			Type:              AnimationTypeTranslate,
			InterpolationType: InterpolationTypeLinear,
			Offset:            offset,
			Duration:          duration,
		},
		X: x,
		Y: y,
	}
}

// takes in a json string and marshals it into an AnimationSet
func ParseAnimationSet(jsonStr string) (AnimationSet, error) {
	var set AnimationSet

	// unmarshall the string into a map[string]interface{}
	var obj map[string]interface{}
	err := json.Unmarshal([]byte(jsonStr), &obj)

	// go over each key in the map and unmarshall it into the appropriate type
	for key, value := range obj {
		switch key {
		case "id":
			set.Id = value.(*int)
		case "type":
			set.Type = value.(ObjectType)
		case "animations":
			// iterate over each animation in the array
			for _, animation := range value.([]interface{}) {
				switch animation.(map[string]interface{})["type"].(string) {
				case "translate":
					var translateAnimation TranslateAnimation
					err = json.Unmarshal([]byte(animation.(map[string]interface{})["animation"].(string)), &translateAnimation)
					set.Animations = append(set.Animations, translateAnimation)
				case "rotate":
					var rotateAnimation RotateAnimation
					err = json.Unmarshal([]byte(animation.(map[string]interface{})["animation"].(string)), &rotateAnimation)
					set.Animations = append(set.Animations, rotateAnimation)
				case "scale":
					var scaleAnimation ScaleAnimation
					err = json.Unmarshal([]byte(animation.(map[string]interface{})["animation"].(string)), &scaleAnimation)
					set.Animations = append(set.Animations, scaleAnimation)
				case "opacity":
					var opacityAnimation OpacityAnimation
					err = json.Unmarshal([]byte(animation.(map[string]interface{})["animation"].(string)), &opacityAnimation)
					set.Animations = append(set.Animations, opacityAnimation)
				case "color":
					var colorAnimation ColorAnimation
					err = json.Unmarshal([]byte(animation.(map[string]interface{})["animation"].(string)), &colorAnimation)
					set.Animations = append(set.Animations, colorAnimation)
				}
			}

		}
	}

	return set, err
}

// Convert an TranslateAnimation to a 4x4 homogeneous matrix
func (t TranslateAnimation) ToMatrix() matrix.Matrix {
	// return matrix with the translation values
	return matrix.Matrix{
		{1, 0, 0, 0},
		{0, 1, 0, 0},
		{0, 0, 1, 0},
		{t.X, t.Y, 0, 1},
	}
}

// Convert a RotateAnimation X rotation to a 4x4 homogeneous matrix and X is specificied in radians
func (r RotateAnimation) ToMatrixX() matrix.Matrix {
	return matrix.Matrix{
		{1, 0, 0, 0},
		{0, math.Cos(r.X), -math.Sin(r.X), 0},
		{0, math.Sin(r.X), math.Cos(r.X), 0},
		{0, 0, 0, 1},
	}
}

func (r RotateAnimation) ToMatrixY() matrix.Matrix {
	return matrix.Matrix{
		{math.Cos(r.Y), 0, math.Sin(r.Y), 0},
		{0, 1, 0, 0},
		{-math.Sin(r.Y), 0, math.Cos(r.Y), 0},
		{0, 0, 0, 1},
	}
}

func (r RotateAnimation) ToMatrixZ() matrix.Matrix {
	return matrix.Matrix{
		{math.Cos(r.Z), -math.Sin(r.Z), 0, 0},
		{math.Sin(r.Z), math.Cos(r.Z), 0, 0},
		{0, 0, 1, 0},
		{0, 0, 0, 1},
	}
}

// ToMatrix on RotationAnimation's returns the product of the three rotation matrices
func (r RotateAnimation) ToMatrix() matrix.Matrix {
	return matrix.Multiply(matrix.Multiply(r.ToMatrixX(), r.ToMatrixY()), r.ToMatrixZ())
}

// Convert a ScaleAnimation to a 4x4 homogeneous matrix
func (s ScaleAnimation) ToMatrix() matrix.Matrix {
	return matrix.Matrix{
		{s.X, 0, 0, 0},
		{0, s.Y, 0, 0},
		{0, 0, 1, 0},
		{0, 0, 0, 1},
	}
}

// json marshal as well
type PlayAnimationMatrix struct {
	Matrix            matrix.Matrix     `json:"matrix"`
	Duration          int               `json:"duration"`
	InterpolationType InterpolationType `json:"interpolationType"`
}

// [0] = duration
// [1] = interpolation type
// [2] = toValue (string | int)
// [3] = fromValue (string | int)
type PlayOpacityAnimation struct {
	Duration          int               `json:"duration"`
	InterpolationType InterpolationType `json:"interpolationType"`
	ToValue           float64           `json:"toValue"`
	FromValue         *float64          `json:"fromValue"`
}

type PlayColorAnimation struct {
	Duration          int               `json:"duration"`
	InterpolationType InterpolationType `json:"interpolationType"`
	ToValue           string            `json:"toValue"`
	FromValue         *string           `json:"fromValue"`
}

// create a map of transforms with their corresponding animation matrix and duration and interpolation type
func (a *AnimationSet) ToMap() map[string][]interface{} {
	animations := make(map[string][]interface{})
	for _, animation := range a.Animations {
		switch anim := animation.(type) {
		case TranslateAnimation:
			matrix := anim.ToMatrix()

			animations["translate"] = append(animations["translate"],
				PlayAnimationMatrix{matrix, anim.Duration,
					anim.InterpolationType})

		case RotateAnimation:
			matrix := anim.ToMatrix()

			animations["rotate"] = append(animations["rotate"],
				PlayAnimationMatrix{matrix, anim.Duration,
					anim.InterpolationType})

		case ScaleAnimation:
			matrix := anim.ToMatrix()

			animations["scale"] = append(animations["scale"],
				PlayAnimationMatrix{matrix, anim.Duration,
					anim.InterpolationType})

		case OpacityAnimation:
			animations["opacity"] = append(animations["opacity"],
				PlayOpacityAnimation{anim.Duration,
					anim.InterpolationType,
					anim.To,
					anim.From})

		case ColorAnimation:
			animations["color"] = append(animations["color"],
				PlayColorAnimation{anim.Duration,
					anim.InterpolationType,
					anim.To,
					anim.From})
		default:
			panic("Unknown animation type")
		}
	}

	return animations
}
