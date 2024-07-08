const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5173;

app.use(bodyParser.json());
app.use(cors());

let receivedIP = '';
let receivedMAC = '';

app.post('/Info', (req: { body: { ip: any; mac: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; ip?: any; mac?: any; }): void; new(): any; }; }; }) => {
    const { ip, mac } = req.body;
    if (ip && mac) {
        receivedIP = ip;
        receivedMAC = mac;
        res.status(200).json({ message: 'Device information received successfully', ip, mac });
    } else {
        res.status(400).json({ message: 'Missing IP or MAC address' });
    }
});

app.get('/Info', (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { ip: string; mac: string; }): void; new(): any; }; }; }) => {
    res.status(200).json({ ip: receivedIP, mac: receivedMAC });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
