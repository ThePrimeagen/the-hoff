import lerpMeDaddy from "./lerp";

export default function transform(from: number[], to: number[], t: number, relative: boolean,
                                  transform: (values: number[], finished: boolean) => boolean | void): void {
    const actualTo = [];
    for (let i = 0; i < to.length; ++i) {
        actualTo[i] = relative ? from[i] + to[i] : to[i];
    }

    const stop = lerpMeDaddy(from, to, t, (curr: number[], finished: boolean) => {
        if (transform(curr, finished) === false) {
            stop();
        }
    });
}
