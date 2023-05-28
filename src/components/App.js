import "../styles/App.css";
import React, { useState, useEffect } from "react";

const keys = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");

const App = () => {
  const [preview, setPreview] = useState('');
  const [quote, setQuote] = useState('');

  const handleKeyPress = (keyValue) => {
    setPreview(preview + keyValue);
  };

  useEffect(() => {
    if (preview === 'forty two') {
      fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
          setQuote(data.content);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setQuote('');
    }
  }, [preview]);

  return (
    <div className="keyboard">
      <div className="preview">{preview}</div>
      <div>
        {keys.map((key) => (
          <button
            key={key}
            id={key === " " ? `key-space` : `key-${key}`}
            onClick={() => handleKeyPress(key)}
          >
            {key === " " ? "Space" : key.toUpperCase()}
          </button>
        ))}
      </div>
      {quote && <div className="quote">{quote}</div>}
    </div>
  );
};

export default App;
