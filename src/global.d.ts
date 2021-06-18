declare type EmptyCallback = () => void;
declare type Stop = () => void;
declare interface Renderer {
    render(): void;
}

// units are radians
declare type RotateOption = {
    x?: number;
    y?: number;
    z?: number;
}

declare type Scale = {
    x: number;
    y: number;
}
