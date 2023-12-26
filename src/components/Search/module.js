import Handlebars from "handlebars";
import icon from "/static/assets/search.png";

export { default as Search } from "./tmpl.hbs?raw";

Handlebars.registerHelper("searchIcon",
    () => { return { icon } });
