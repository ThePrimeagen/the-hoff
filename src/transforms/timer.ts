import raf from "../utils/raf";

export type Callback = (percentDone: number, finished: boolean) => void;

export default function createTimer(time: number, cb: Callback): Stop {
    const start = Date.now();
    let stop = false;

    function run() {
        const diff = Date.now() - start;
        if (diff >= time || stop) {
            cb(1, true);
            return;
        }

        cb(diff / time, false);
        raf(run);
    }

    raf(run);
    return function() {
        stop = true;
    };
};

