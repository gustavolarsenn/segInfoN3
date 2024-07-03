const http = require('http');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongoDB = require('./config/mongo'); // Import the MongoDB connection logic

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

connectToMongoDB();

var corsOptions = {
    origin: "http://localhost:5300"
  };

app.use(cors(corsOptions));

require("./routes/user_routes.js")(app);
require("./routes/report_routes.js")(app);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello, World!');
// })

// // Use user routes
// server.on('request', userRoutes);

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });