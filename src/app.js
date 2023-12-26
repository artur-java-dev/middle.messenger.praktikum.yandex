import Handlebars from "handlebars";
import { components } from "./components/map.js";
import { pages } from "./pages/map.js";
import avatar from "/static/assets/no-avatar.png";
import img404 from "/static/assets/err-404.png";
import img500 from "/static/assets/err-500.png";



const pagesContext = new Map();
pagesContext.set("PageProfile", { avatar });
pagesContext.set("PageError404", { img404 });
pagesContext.set("PageError500", { img500 });


registerComponentTemplates();
const pageTemplates = compilePageTemplates();

document.addEventListener("DOMContentLoaded", () => navigateTo("Login"));

document.addEventListener("click",
    (e) => {
        const attr = e.target.getAttribute("href");
        if (attr !== undefined)
            navigateTo(attr.substring(1));
    });


function compilePageTemplates() {
    const map = new Map;
    for (let [name, tmpl] of pages) {
        const template = Handlebars.compile(tmpl);
        map.set(name, template);
    }
    return map;
}


function registerComponentTemplates() {
    for (let [name, tmpl] of components) {
        Handlebars.registerPartial(name, tmpl);
    }
}


function navigateTo(pageName) {
    const tmpl = pageTemplates.get(pageName);

    if (tmpl === undefined)
        throw Error(`нет шаблона для страницы "${pageName}"`);

    const appElem = document.querySelector("#app");
    const ctx = pagesContext.get(pageName);
    appElem.innerHTML = (ctx === null) ? tmpl() : tmpl(ctx);
}
