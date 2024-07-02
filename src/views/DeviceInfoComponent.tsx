const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/device-info', (req: { body: { ipAddress: any; macAddress: any; }; }, res: { json: (arg0: { message: string; }) => void; }) => {
    const { ipAddress, macAddress } = req.body;
    console.log(`Received IP: ${ipAddress}, MAC: ${macAddress}`);
    // Process the data as needed
    res.json({ message: 'Device info received successfully' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
