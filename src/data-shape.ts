type HoffAnimationType = "translate" | "scale" | "rotate" | "opacity";

type HoffAnimation = {
    type: HoffAnimationType;
    offset: number;
    loop?: number | true;
    t: number,
}

type HoffTranslate = HoffAnimation & {
    x: number,
    y: number,
    absolute: boolean,
}

type HoffScale = HoffAnimation & {
    x: number,
    y: number,
}

type HoffRotate = HoffAnimation & {
    x: number,
    y: number,
    z: number,
}

type HoffState = {
    opacity: number,
    loop?: number | true,
    translate: {
        x: number,
        y: number,
    },
    scale?: {
        x: number,
        y: number
    },
    rotation?: {
        x: number,
        y: number,
        z: number
    }
}

type DataShape = {
    layer: number,
    offset: number,
    initialState: HoffState,
    animations: HoffAnimation[]
}
