var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;

var config = {
    user: 'santugundu',
    database: 'santugundu',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
var date = new Date().toString();


var requests = {

		 'request-One' : {
			title: 'request-One',
			heading: 'request-One | Santhosh Kumar',
			date: date,
			content: `<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
		commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
		velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
		occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
		mollit anim id est laborum
		</p>`
			
		},
		 'request-Two' : {
			title: 'request-Two',
			heading: 'request-Two | Santhosh Kumar',
			date: date,
			content: `<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
		commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
		velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
		occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
		mollit anim id est laborum
		</p>`
			
		},

		'request-Three' :{
			title: 'request-Three',
			heading: 'request-Three | Santhosh Kumar',
			date: date,
			content: `<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
		commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
		velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
		occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
		mollit anim id est laborum
		</p>`
			
		}

};
	function createTemplate(data){
		var title = data.title;
		var date = data.date;
		var heading = data.heading;
		var content = data.content;
			var htmlTemplate = `<html>
			<head>
			<title> ${title}</title>
			<meta name="viewport" content = "width=device-width, initial-scale=1"/>
			</head>
			<body>
			<h1>${heading}</h1>

			<div>
			<p>
			<h2>${date}</h2>
			</p>
			</div>
			<p>
			${content}
			</p>
			</body>
			</html>`;
			return htmlTemplate;
	}

var counter = 0;
app.get('/counter', function (req, res) {
	counter = counter +1;
	res.send(counter.toString());
});	

//to connect to DB
var pool = new Pool(config);
/*
app.get('/article-db', function(req, res) {
    
    //make a select request
    //return response with the results
    pool.query('select * from article' , function(err, result){
        
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
    
});*/
var names = [];
//app.get('/submit-name/:name' , function (req, res) { // url /submit-name/name1
app.get('/submit-name' , function (req, res) {	
	//var name = req.params.name; //use this for the above commented code
	var name = req.query.name;   // url is /submit-name?abc
	names.push(name);
	res.send(JSON.stringify(names));
});
	
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});






app.get('/:requestName', function (req, res) {
  //res.sendFile(path.join(__dirname, 'ui', 'requestOne.html'));
  var requestName = req.params.requestName;
  res.send(createTemplate(requests[requestName]));
});
app.get('/ui/main.js', function(req, res){
	res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
