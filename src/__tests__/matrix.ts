import { createIdentity, multiply, createScaleMatrix } from "../matrix";

describe("Matrix", function() {

    it("should multiple two matrices", function() {
        const ident = createIdentity();
        const scale = createScaleMatrix(2, 3, 4);

        expect(multiply(ident, scale)).toEqual([
            [2, 0, 0, 0],
            [0, 3, 0, 0],
            [0, 0, 4, 0],
            [0, 0, 0, 1],
        ]);
    });

});

