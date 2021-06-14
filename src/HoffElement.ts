import { matrixToString, createIdentity, Matrix, multiply } from "./matrix";

export type HoffElementStats = {
    width: number;
    height: number;
    x: number;
    y: number;
}

export interface HoffElement {
    getStats(): HoffElementStats;
    render(): void;
}

const identity = createIdentity();
export class HoffElementImpl implements HoffElement {

    public scale: Matrix;
    public translate: Matrix;
    public rotateX: Matrix;
    public rotateY: Matrix;
    public rotateZ: Matrix;
    public opacity: number;

    constructor(private el: HTMLElement) {
        // TODO: If I start doing inplace transforms, then we need to stop doing
        // this...
        this.scale = createIdentity();
        this.translate = createIdentity();
        this.rotateX = createIdentity();
        this.rotateY = createIdentity();
        this.rotateZ = createIdentity();
        this.opacity = 1;
    }

    getStats(): HoffElementStats {
        return this.el.getBoundingClientRect();
    }

    render(): void { // todo
        let matrix = multiply(
            identity, this.scale, this.rotateX,
            this.rotateY, this.rotateZ, this.translate);

        this.el.style.transform = matrixToString(matrix);
    }
}
