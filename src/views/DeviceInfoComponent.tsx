// server.ts
import express from 'express';

const app = express();
const port = 5173;

app.use(express.json());

app.post('/Info', (req, res) => {
    const { word } = req.body;
    console.log('Word received:', word);
    res.status(200).json({ message: 'Word received successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
