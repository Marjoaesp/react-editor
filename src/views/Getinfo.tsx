// App.tsx
import React from 'react';

const App: React.FC = () => {
    const sendWord = async () => {
        const serverUrl = 'http://localhost:5173/Info';
        const wordToSend = 'hello';

        try {
            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word: wordToSend }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log('Server response:', data);
        } catch (error) {
            console.error('Error sending word:', error);
        }
    };

    return (
        <div>
            <h1>React App</h1>
            <button onClick={sendWord}>Send Word</button>
        </div>
    );
};

export default App;
