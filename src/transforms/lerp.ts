import createTimer from "./timer";

type Callback = (currentLerp: number[], finished: boolean) => void;

// TODO: Make it so that we can apply many of the transforms at the same time...
export default function lerpMeDaddy(
    from: number[], to: number[], time: number, cb: Callback): Stop {

    const diff = to.map((x: number, i: number) => x - from[i]);

    const stop = createTimer(time, function(pd: number, finished: boolean) {
        const currentDiff = diff.map((x: number, i: number) => from[i] + x * pd);
        cb(currentDiff, finished);
    });

    return stop;
};

