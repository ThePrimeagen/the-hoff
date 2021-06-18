let toRender = new Set<Renderer | EmptyCallback>();
let currentAnimationFrame: number = -1;

function _render() {
    const _toRender = toRender;
    toRender = new Set<Renderer | EmptyCallback>();

    for (const renderer of _toRender) {
        if (typeof renderer === "function") {
            renderer();
        } else {
            renderer.render();
        }
    }

    currentAnimationFrame = -1;
}

export default function render(renderer: Renderer | EmptyCallback) {
    toRender.add(renderer);

    if (currentAnimationFrame === -1) {
        currentAnimationFrame = requestAnimationFrame(_render);
    }
}

