const express = require('express');
const app = express();

var bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos')

app.use(express.static(__dirname + '/views'));

app.use(express.static(__dirname + '/public'));

app.set ("view engine", "html");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
 extended: true
}));




app.get("/", function(req, res) {
    res.sendFile('index');
});

app.use('/api/todos', todoRoutes);

app.listen(5000, function() {
    console.log("Express: Server Started!");
});