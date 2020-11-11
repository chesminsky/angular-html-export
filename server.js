//Install express server
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/dist/html-export`));

app.get('/*', function(req,res) {
    res.sendFile(`${__dirname}/dist/html-export/index.html`);
});

app.listen(port);

console.log(`listening app tickets on port ${port}`);