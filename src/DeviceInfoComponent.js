var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var port = 5173;

app.use(bodyParser.json());
app.use(cors());

var receivedIP = '';
var receivedMAC = '';
var receivedID = '';

app.post('/info', function (req, res) {
    var { ip, mac, id } = req.body;
    if (ip && mac && id) {
        receivedIP = ip;
        receivedMAC = mac;
        receivedID = id;
        res.status(200).json({ message: 'Device information received successfully', ip: ip, mac: mac, id: id });
    } else {
        res.status(400).json({ message: 'Missing IP, MAC address, or ID' });
    }
});

app.get('/info', function (req, res) {
    var { id } = req.query;
    if (id === receivedID) {
        res.status(200).json({ ip: receivedIP, mac: receivedMAC });
    } else {
        res.status(403).json({ message: 'Invalid ID' });
    }
});

app.listen(port, function () {
    console.log(`Server running on http://localhost:${port}`);
});
