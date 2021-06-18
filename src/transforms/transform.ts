import lerpMeDaddy from "./lerp";

export default function transform(diff: number[], t: number,
                                  transform: (values: number[], finished: boolean) => boolean | void): Stop {

    return lerpMeDaddy(diff, t, (curr: number[], finished: boolean) => {
        if (transform(curr, finished) === false) {
            stop();
        }
    });
}
