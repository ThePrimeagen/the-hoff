import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app

/*
import { HoffElementImpl } from './HoffElement'
import './style.css'
import Transformer from './transforms';

const COLORS = "ABCDEF1234567890";
function getRandom(stop: number, start = 0) {
    const diff = stop - start;
    return Math.floor(Math.random() * diff) + start;
}

function getColor() {
    return [
        "#",
        COLORS[getRandom(COLORS.length)],
        COLORS[getRandom(COLORS.length)],
        COLORS[getRandom(COLORS.length)],
    ].join("");
}
function createElement(div: HTMLElement): Transformer {
    div.style.backgroundColor = getColor();
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.position = "absolute";

    return new Transformer(new HoffElementImpl(div));
}

const animations = [
    function(el: Transformer) {
        el.rotate({
            z: getRandom(3) * Math.PI,
        }, getRandom(5000, 500));
    },

    function(el: Transformer) {
        el.scale(
            getRandom(2, 0.5),
            getRandom(2, 0.5),
            getRandom(5000, 500));
    },

    function(el: Transformer) {
        el.translate(
            getRandom(500, 0) * (Math.random() > 0.5 ? 1 : -1),
            getRandom(500, 0) * (Math.random() > 0.5 ? 1 : -1),
            getRandom(5000, 500));
    },
];

function animate(el: Transformer, animCount: number, maxTime: number): void {
    for (let i = 0; i < animCount; ++i) {
        setTimeout(function() {
            animations[getRandom(animations.length)](el);
        }, getRandom(maxTime, 250));
    }
}

const app = document.querySelector<HTMLDivElement>('#app')!

for (let i = 0; i < 100; ++i) {
    const div = document.createElement("div");
    animate(createElement(div), 100, 20000);
    app.appendChild(div);
}

*/
