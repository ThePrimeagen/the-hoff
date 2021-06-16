import transform from "./transform";
import { HoffElement } from "../HoffElement";
import * as Matrix from "../matrix";
import render from "./renderer";

let _id = 0;

export default class Transformer implements Renderer {
    // TODO: do we need centerpoint?

    constructor(private el: HoffElement) { }

    render(): void {
        this.el.render();
    }

    setPosition(x: number, y: number): void {
        Matrix.createTranslateMatrix(x, y, 1, this.el.translate);
        render(this);
    }

    // TODO: Deal with abs translations
    // TODO: Generating lots of garbage with getStats().
    translate(x: number, y: number, t: number): void {
        transform([x, y], t, ([currX, currY]: number[]) => {
            Matrix.addTranslation(currX, currY, 1, this.el.translate);
            render(this);
        });
    }

    // TODO: Future prime.  You should think about making this nicer... maybe..
    // TODO: FUture prime. think about absolute rotations..
    rotate(opts: RotateOption, t: number): void {

        if (opts.x) {
            transform([opts.x], t, ([x]) => {
                this.el.setRotX(this.el.getStats().rotX + x);
                render(this);
            });
        }

        if (opts.y) {
            transform([opts.y], t, ([y]) => {
                this.el.setRotY(this.el.getStats().rotY + y);
                render(this);
            });
        }

        if (opts.z) {
            transform([opts.z], t, ([z]) => {
                this.el.setRotZ(this.el.getStats().rotZ + z);
                render(this);
            });
        }
    }
}





