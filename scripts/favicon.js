import { readFileSync, writeFileSync } from "fs";
import toIco from "to-ico";


const logo = readFileSync("logo.png");

toIco(logo).then(data =>
  writeFileSync("favicon.ico", data));
