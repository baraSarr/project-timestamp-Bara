// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date_string", function (req, res) {
  date_string = req.params.date_string;
  pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
  if(!pattern.test(date_string)) {
    date_int = parseInt(date_string);
    date = new Date(date_int);
  } else {
    date = Date.parse(date_string);
  }
  if(date.toString() === "Invalid Date" || date == NaN)
    res.json({error:"Invalid Date"});
  else {
    let unixTimestamp = date.getTime();
    let utcTime = date.toUTCString();
    res.json({"unix": unixTimestamp, "utc": utcTime});
  }
  
});

app.get("/api/", function(req, res) {
  date = new Date();
  res.json({unix: date.getTime(), utc:date.toUTCString()});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
