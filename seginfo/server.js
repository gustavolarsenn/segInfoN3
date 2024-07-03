const http = require('http');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongoDB = require('./config/mongo');

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

connectToMongoDB();

var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
  };

app.use(cors(corsOptions));

require("./routes/user_routes.js")(app);
require("./routes/report_routes.js")(app);

const hostname = '127.0.0.1';
const port = 8000;

app.listen(port, () => console.log(`Listening on port ${port}`));