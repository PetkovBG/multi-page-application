const express = require('express');

const port = 3500;

const routes = require('./routes');

const app = express();



app.use(routes);

app.listen(port, () => console.log(`Server has started on port #${port}..`));