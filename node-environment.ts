import NodeEnvironment from "jest-environment-node";

export default class HoffEnv extends NodeEnvironment {
    async setup(): Promise<void> {
        this.global.requestAnimationFrame = (cb: () => void): ReturnType<typeof setTimeout> => {
            return this.global.setTimeout(cb);
        };
    }
}


