import Handlebars from "handlebars";
import img from "/static/assets/err-500.png";

export { default as PageError500 } from "./tmpl.hbs?raw";

Handlebars.registerHelper("img500",
    () => { return { img } });
