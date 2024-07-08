export {};
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5173;

app.use(bodyParser.json());
app.use(cors());

let receivedWord = '';

app.post('/Info', (req: { body: { word: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; word?: any; }): void; new(): any; }; }; }) => {
    const { word } = req.body;
    if (word) {
        receivedWord = word;
        res.status(200).json({ message: 'Word received successfully', word });
    } else {
        res.status(400).json({ message: 'No word received' });
    }
});

app.get('/Info', (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { word: string; }): void; new(): any; }; }; }) => {
    res.status(200).json({ word: receivedWord });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
