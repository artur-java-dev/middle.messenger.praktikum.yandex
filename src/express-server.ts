//@ts-nocheck
import express, { static as expressStatic } from 'express';


const app = express();
const PORT = 3000;

app.use("/", expressStatic(`../index.html`));
app.use("/static", expressStatic(`../static`));


app.listen(PORT,
    () => {
        console.log(`выполнен запуск сервера (порт: ${PORT})`);
    });
