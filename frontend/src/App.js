import React, { useEffect, useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('/api/notes').then(res => res.json()).then(setNotes);
  }, []);

  const addNote = () => {
    fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: input })
    }).then(res => res.json())
      .then(note => setNotes([...notes, note]));
  };

  return (
    <div>
      <h1>My Notes</h1>
      <input onChange={e => setInput(e.target.value)} />
      <button onClick={addNote}>Add</button>
      <ul>{notes.map((n, i) => <li key={i}>{n.content}</li>)}</ul>
    </div>
  );
}

export default App;
