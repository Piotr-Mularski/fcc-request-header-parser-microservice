// server.js
// where your node app starts

// init project
const express = require('express');
const requestIP = require('request-ip');
const cors = require('cors');

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use((req, res, next) => {
	req.clientIp = requestIP.getClientIp(req);
	next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
	const responseJSON = {
		ipaddress: req.clientIp,
		language: req.headers['accept-language'],
		software: req.headers['user-agent']
	};
	res.json(responseJSON);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
