var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var port = 5173;

app.use(bodyParser.json());
app.use(cors());

var receivedIP = '';
var receivedMAC = '';

app.post('/info', function (req: { body: { ip: any; mac: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; ip?: any; mac?: any; }): void; new(): any; }; }; }) {
    var { ip, mac } = req.body;
    if (ip && mac) {
        receivedIP = ip;
        receivedMAC = mac;
        res.status(200).json({ message: 'Device information received successfully', ip: ip, mac: mac });
    } else {
        res.status(400).json({ message: 'Missing IP or MAC address' });
    }
});

app.get('/info', function (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { ip: string; mac: string; }): void; new(): any; }; }; }) {
    res.status(200).json({ ip: receivedIP, mac: receivedMAC });
});

app.listen(port, function () {
    console.log(`Server running on http://localhost:${port}`);
});
