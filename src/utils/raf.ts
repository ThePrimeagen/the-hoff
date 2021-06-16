export default function raf(cb: () => void): void {
    requestAnimationFrame(cb);
}
