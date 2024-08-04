const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const filePath = path.join(__dirname, 'count.json');

app.get('/', (req, res) => {
    const dataJson = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(dataJson);
    data.countMain = +(data.countMain) + 1;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.send(`<h1>Добро пожаловать на главную страницу!</h1>
                    <h2>Просмотров - ${data.countMain}</h2>
                    <a href='/about'>Ссылка на страницу about</a>
                     `);

});

app.get('/about', (req, res) => {
    const dataJson = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(dataJson);
    data.countAbout = +(data.countAbout) + 1;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.send(`<h1>Добро пожаловать на главную страницу!</h1>
                    <h2>Просмотров - ${data.countAbout}</h2>
                    <a href='/'>Ссылка на главную страницу</a>
                    `);

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
})
