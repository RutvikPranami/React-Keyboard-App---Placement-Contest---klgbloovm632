import "../styles/App.css";
import React, { useState, useEffect } from "react";

const keys = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");

const App = () => {
  const [input,setInput] = useState("");
  const [quote,setQuote] = useState("");

  useEffect(()=>{
    if (input === "forty two") {
      fetch("https://api.quotable.io/random")
      .then(res=>res.json())
      .then(data=>setQuote(data.content))
    }else{
      setQuote("");
    }
  },[input])

  return (
    <div className="keyboard">
      <div className="preview">{input}</div>
      {!!quote && <div className="quote">{quote}</div>}
      <div>
        {keys.map((key) => (
          <button key={key} id={key === " " ? `key-space` : `key-${key}`} onClick={()=>{setInput(prev=>prev + key)}}>
            {key === " " ? "Space" : key.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
