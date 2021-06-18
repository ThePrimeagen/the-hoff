type Vector = [number, number, number, number];
export type Matrix = [Vector, Vector, Vector, Vector];

function createEmpty(): Matrix {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
}

export function createIdentity(): Matrix {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ];
}

export function multiply(...matrices: Matrix[]): Matrix {
    let out: Matrix | null = null;

    for (let i = 0; i < matrices.length; ++i) {
        out = _multiply(matrices[i], out ?? createIdentity());
    }

    return out as Matrix; // fu you typescript
}

function _multiply(a: Matrix, b: Matrix, out: Matrix = createEmpty()): Matrix {

    // This is so dang expensive in JS...
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            for (let k = 0; k < 4; k++) {
                out[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return out;
}

export function addScales(x: number, y: number, z: number, matrix: Matrix): Matrix {
    matrix[0][0] += x;
    matrix[1][1] += y;
    matrix[2][2] += z;

    return matrix;
}

export function getScaleValues(matrix: Matrix): [number, number, number] {
    return [
        matrix[0][0],
        matrix[1][1],
        matrix[2][2],
    ];
}

export function createScaleMatrix(
    x: number, y: number, z: number, matrix = createEmpty()): Matrix {

    matrix[0][0] = x;
    matrix[1][1] = y;
    matrix[2][2] = z;
    matrix[3][3] = 1;

    return matrix;
}

export function addTranslation(x: number, y: number, z: number, matrix: Matrix): Matrix {

    matrix[3][0] += x;
    matrix[3][1] += y;
    matrix[3][2] += z;

    return matrix;
}

export function createTranslateMatrix(x: number, y: number, z: number = 1, matrix = createIdentity()): Matrix {

    matrix[3][0] = x;
    matrix[3][1] = y;
    matrix[3][2] = z;

    return matrix;
}

export function addRotateX(radians: number, matrix: Matrix): Matrix {
    matrix[0][0] += Math.cos(radians);
    matrix[0][1] += Math.sin(radians);
    matrix[1][0] += -Math.sin(radians);
    matrix[1][1] += Math.cos(radians);

    return matrix;
}

export function createRotXMatrix(radians: number, matrix = createIdentity()): Matrix {

    matrix[0][0] = 1;
    matrix[1][1] = Math.cos(radians);
    matrix[1][2] = -Math.sin(radians);
    matrix[2][1] = Math.sin(radians);
    matrix[2][2] = Math.cos(radians);

    return matrix;

}

export function createRotYMatrix(radians: number, matrix = createIdentity()): Matrix {

    matrix[0][0] = Math.cos(radians);
    matrix[0][1] = Math.sin(radians);
    matrix[2][0] = -Math.sin(radians);
    matrix[2][1] = Math.cos(radians);

    return matrix;
}

export function createRotZMatrix(radians: number, matrix = createIdentity()): Matrix {

    matrix[0][0] = Math.cos(radians);
    matrix[0][1] = -Math.sin(radians);
    matrix[1][0] = Math.sin(radians);
    matrix[1][1] = Math.cos(radians);

    return matrix;
}

export function matrixToString(matrix: Matrix): string {
    return `matrix3d(${matrix.map(line => line.join()).join()})`;
}
