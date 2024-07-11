const serverUrl = 'http://192.168.255.55:5173/info';

function generateRandomId() {
    // Generate a random ID (e.g., using a simple approach)
    return Math.random().toString(36).substr(2, 9);
}

function sendDeviceInformation(ip, mac, id) {
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip, mac, id }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error sending device information:', error);
    });
}

function getDeviceNetworkInfo() {
    tizen.systeminfo.getPropertyValue("WIFI_NETWORK", function(wifi) {
        let ip = wifi.ipAddress;
        let mac = wifi.macAddress;
        let id = generateRandomId(); // Generate a random ID

        console.log('IP Address:', ip);
        console.log('MAC Address:', mac);
        console.log('Random ID:', id);

        // Display the ID on the TV screen (you can modify this based on your UI framework)
        // For example, assuming you have an element with id="idDisplay" on your HTML
        document.getElementById('idDisplay').innerText = `ID: ${id}`;

        // Send the device information to the server
        sendDeviceInformation(ip, mac, id);
    }, function(error) {
        console.error('Error retrieving network information:', error);
    });
}

window.addEventListener('load', function() {
    getDeviceNetworkInfo();
});
