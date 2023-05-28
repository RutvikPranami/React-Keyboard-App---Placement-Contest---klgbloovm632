import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const keys = 'abcdefghijklmnopqrstuvwxyz8123456789 '.split('');

const App = () => {
  const [preview, setPreview] = useState('');
  const [quote, setQuote] = useState('');

  const handleKeyClick = (keyValue) => {
    setPreview((prevPreview) => prevPreview + keyValue);
  };

  const fetchQuote = async () => {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    setQuote(data.content);
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (key === ' ') {
      handleKeyClick(' ');
    } else if (key.length === 1) {
      handleKeyClick(key);
    }

    if (preview.toLowerCase().trim() === 'forty two') {
      fetchQuote();
    } else {
      setQuote('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [preview]);

  return (
    <div className="keyboard">
      <div className="preview">{preview}</div>

      {quote && (
        <div className="quote">{quote}</div>
      )}

      <div>
        {keys.map((key) => (
          <button
            key={`key-${key}`}
            id={`key-${key}`}
            onClick={() => handleKeyClick(key === ' ' ? ' ' : key.toUpperCase())}
          >
            {key === ' ' ? 'Space' : key.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
