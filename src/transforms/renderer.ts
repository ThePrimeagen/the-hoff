const toRender = new Set<Renderer>();
let currentAnimationFrame: number = -1;

function _render() {
    for (const renderer of toRender) {
        renderer.render();
    }

    toRender.clear();
    currentAnimationFrame = -1;
}

export default function render(renderer: Renderer) {
    toRender.add(renderer);

    if (currentAnimationFrame === -1) {
        currentAnimationFrame = requestAnimationFrame(_render);
    }
}

