import { HoffElementImpl } from './HoffElement'
import './style.css'
import Transformer from './transforms';

const div = document.createElement("div");
div.style.backgroundColor = "#000";
div.style.width = "50px";
div.style.height = "50px";

const el = new Transformer(new HoffElementImpl(div));
el.translate(100, 0, 2000)
setTimeout(function() {
    el.translate(100, 0, 2000)
}, 1000);

// @ts-ignore
window.MyElement = el;

const app = document.querySelector<HTMLDivElement>('#app')!
app.appendChild(div);
