import createTimer from "./timer";

type Callback = (currentLerp: number[], finished: boolean) => void;

// TODO: Make it so that we can apply many of the transforms at the same time...
export default function lerpMeDaddy(
    diff: number[], time: number, cb: Callback): Stop {

    const last = new Array(diff.length).fill(0);
    const stop = createTimer(time, function(pd: number, finished: boolean) {

        // This seems gross.  Doing a mutation within a map fn
        const currentDiff = diff.map((x: number, i: number) => {
            const delta = x * pd - last[i];

            last[i] += delta;
            return delta;
        });

        cb(currentDiff, finished);
    });

    return stop;
};

