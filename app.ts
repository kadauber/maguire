import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

const app: express.Express = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

app.listen(3000, function () {
    console.log("listening on port 3000");
});
