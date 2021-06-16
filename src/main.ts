import { HoffElementImpl } from './HoffElement'
import './style.css'
import Transformer from './transforms';

const div = document.createElement("div");
div.style.backgroundColor = "#000";
div.style.width = "50px";
div.style.height = "50px";

const el = new Transformer(new HoffElementImpl(div));

el.rotate({
    z: 2 * Math.PI,
}, 2000)
setTimeout(function() {
    el.rotate({
        z: 2 * Math.PI,
    }, 1000)
}, 1000);
el.translate(200, 200, 2000);


// @ts-ignore
window.MyElement = el;

const app = document.querySelector<HTMLDivElement>('#app')!
app.appendChild(div);
