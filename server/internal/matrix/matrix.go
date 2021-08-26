package matrix

// Performs matrx multiplication
// A matrix is a 4x4 float64 array
type Matrix [4][4]float64

// Multiplies two matrices
func Multiply(m1, m2 Matrix) Matrix {
	var m3 Matrix
	for i := 0; i < 4; i++ {
		for j := 0; j < 4; j++ {
			for k := 0; k < 4; k++ {
				m3[i][j] += m1[i][k] * m2[k][j]
			}
		}
	}
	return m3
}
