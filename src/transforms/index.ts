import { HoffElement } from "../HoffElement";
import createTimer from "./timer";

class Transformer {
    private width: number;
    private height: number;

    // TODO: do we need centerpoint?

    constructor(private el: HoffElement) {
        const bounds = el.getStats();
        this.width = bounds.width;
        this.height = bounds.height;
    }

    scale(x: number, y: number, t: number, relative: boolean = false): Promise<void> {
    };

    translate(x: number, y: number, t: number, relative: boolean = false): Promise<void> {
        return new Promise((res, rej) => {
            const {
                x: startX,
                y: startY,
            } = this.getStats();

            const diffX = relative ? x : startX - x;
            const diffY = relative ? y : startY - y;

            const timer = createTimer(t, (percent: number) => {
                const pX = percent * diffX;
                const pY = percent * diffY;
            });
        });
    }

    private getStats(): DOMRect {
        return this.el.getBoundingClientRect();
    }
}

