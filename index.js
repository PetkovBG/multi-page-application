const express = require('express');

const handlebars = require('express-handlebars');

const port = 3500;

const routes = require('./routes');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(routes);

app.listen(port, () => console.log(`Server has started on port #${port}..`));