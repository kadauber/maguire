"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.listen(3000, function () {
    console.log("listening on port 3000");
});
//# sourceMappingURL=server.js.map