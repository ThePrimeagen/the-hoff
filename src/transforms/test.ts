import raf from "../utils/raf";

export default function testMeDaddy(cb: () => void): void {
    raf(() => {
        cb();
    });
}

