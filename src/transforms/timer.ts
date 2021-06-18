import render from "./renderer";

export type Callback = (percentDone: number, finished: boolean) => void;

export default function createTimer(time: number, cb: Callback): Stop {
    const start = Date.now();
    let stop = false;

    function run() {
        if (stop) {
            return;
        }

        const diff = Date.now() - start;
        if (diff >= time) {
            cb(1, true);
            return;
        }

        cb(diff / time, false);
        render(run);
    }

    render(run);
    return function() {
        stop = true;
    };
};

