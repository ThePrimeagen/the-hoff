import { HoffElementImpl } from './HoffElement'
import './style.css'
import Transformer from './transforms';

const div = document.createElement("div");
div.style.backgroundColor = "#000";
div.style.width = "100px";
div.style.height = "100px";

const el = new Transformer(new HoffElementImpl(div));
el.translate(500, 500, 3000).then(function() {
    console.log("I TRANSLATED!!");
});

// @ts-ignore
window.MyElement = el;

const app = document.querySelector<HTMLDivElement>('#app')!
app.appendChild(div);
