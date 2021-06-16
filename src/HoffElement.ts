import { matrixToString, createIdentity, Matrix, multiply, createRotXMatrix, createRotYMatrix, createRotZMatrix } from "./matrix";

export type HoffElementStats = {
    width: number;
    height: number;
    x: number;
    y: number;
    rotX: number;
    rotY: number;
    rotZ: number;
}

export interface HoffElement {
    scale: Matrix;
    translate: Matrix;
    rotateX: Matrix;
    rotateY: Matrix;
    rotateZ: Matrix;
    opacity: number;
    getStats(): HoffElementStats;
    render(): void;
    setRotX(x: number): void;
    setRotY(x: number): void;
    setRotZ(x: number): void;
}

const identity = createIdentity();
export class HoffElementImpl implements HoffElement {

    public scale: Matrix;
    public translate: Matrix;
    public rotateX: Matrix;
    public rotateY: Matrix;
    public rotateZ: Matrix;
    public opacity: number;

    private rotX: number;
    private rotY: number;
    private rotZ: number;

    constructor(private el: HTMLElement) {
        // TODO: If I start doing inplace transforms, then we need to stop doing
        // this...
        this.scale = createIdentity();
        this.translate = createIdentity();
        this.rotateX = createIdentity();
        this.rotateY = createIdentity();
        this.rotateZ = createIdentity();
        this.rotX = this.rotY = this.rotZ = 0;
        this.opacity = 1;
    }

    setRotX(x: number): void {
        this.rotX = x;
        createRotXMatrix(x, this.rotateX);
    }

    setRotY(y: number): void {
        this.rotY = y;
        createRotYMatrix(y, this.rotateY);
    }

    setRotZ(z: number): void {
        this.rotZ = z;
        createRotZMatrix(z, this.rotateZ);
    }

    getStats(): HoffElementStats {
        const stats = this.el.getBoundingClientRect() as any as HoffElementStats;

        stats.rotX = this.rotX;
        stats.rotY = this.rotY;
        stats.rotZ = this.rotZ;

        return stats;
    }

    render(): void { // todo
        console.log("El#Render", this.translate[3]);
        // this should be the ordering..
        /*
        let matrix = multiply(
            identity, this.scale, this.rotateX,
            this.rotateY, this.rotateZ, this.translate);
        */

        let matrix = multiply(
            identity, this.translate, this.rotateZ,
            this.rotateY, this.rotateX, this.scale);

        this.el.style.transform = matrixToString(matrix);
    }
}
