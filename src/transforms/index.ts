import transform from "./transform";
import { HoffElement } from "../HoffElement";
import * as Matrix from "../matrix";
import lerpMeDaddy from "./lerp";
import render from "./renderer";

export default class Transformer implements Renderer {
    private width: number;
    private height: number;

    // TODO: do we need centerpoint?

    constructor(private el: HoffElement) {
        const bounds = el.getStats();
        this.width = bounds.width;
        this.height = bounds.height;
    }

    render(): void {
        this.el.render();
    }

    translate(x: number, y: number, t: number, relative: boolean = false): void {
        const {
            x: fromX,
            y: fromY,
        } = this.el.getStats();

        transform([fromX, fromY], [x, y], t, relative, ([currX, currY]: number[]) => {
            Matrix.createTranslateMatrix(currX, currY, 1, this.el.translate);
            render(this);
        });
    }
}




