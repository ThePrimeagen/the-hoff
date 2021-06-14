export type Callback = (percentDone: number) => void;
export type Stop = () => void;

export default function createTimer(time: number, cb: Callback): Stop {
    const start = Date.now();
    let stop = false;

    function run() {
        const diff = Date.now() - start;
        if (diff > time || stop) {
            cb(1);
            return;
        }

        cb(diff / start);
        requestAnimationFrame(run);
    }

    requestAnimationFrame(run);
    return function() {
        stop = true;
    };
};

