// DisplayInfo.tsx
import React, { useEffect, useState } from 'react';

const Info: React.FC = () => {
    const [word, setWord] = useState<string>('');

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const response = await fetch('http://localhost:5173/Info');
                const data = await response.json();
                setWord(data.word);
            } catch (error) {
                console.error('Error fetching word:', error);
            }
        };

        fetchWord();
    }, []);

    return (
        <div>
            <h1>Received Word</h1>
            <p>{word}</p>
        </div>
    );
};

export default Info;
