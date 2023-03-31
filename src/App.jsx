import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

    const [activeNotes, setActiveNotes] = useState([])

  const notes = [
    'C',
    'C#/Db',
    'D',
    'D#/Eb',
    'E',
    'F',
    'F#/Gb',
    'G',
    'G#/Ab',
    'A',
    'A#/Bb',
    'B'
  ];

  const handleKeyClick = e => {
    e.target.classList.toggle('key--selected');
    if (activeNotes.includes(e.target.textContent)) {
      setActiveNotes(activeNotes.filter(note => note !== e.target.textContent));
    } else {
      setActiveNotes([...activeNotes, e.target.textContent]);
    }
  };

  const generateNotes = (scaleRoot) => {
    const scale = [scaleRoot]
    let idx = notes.indexOf(scaleRoot);
    // whole step, whole step, half step, whole step, whole step, whole step
    idx = (idx + 2) % notes.length;
    scale.push(notes[idx]);
    idx = (idx + 2) % notes.length;
    scale.push(notes[idx]);
    idx = (idx + 1) % notes.length;
    scale.push(notes[idx]);
    idx = (idx + 2) % notes.length;
    scale.push(notes[idx]);
    idx = (idx + 2) % notes.length;
    scale.push(notes[idx]);
    idx = (idx + 2) % notes.length;
    scale.push(notes[idx]);
    return scale;
  };

  const notesInScale = (scaleRoot, selectedNotes) => {
    const scaleNotes = generateNotes(scaleRoot);
    return selectedNotes.filter(note => !scaleNotes.includes(note)).length == 0;
  };

  return (
    <div className="App">
      <h1>Scaler - Find music scales from selected piano notes</h1>
      <div>
        <h2>Notes</h2>
        <ul className='piano'>
          {notes.map(note => {
            if (note.includes('#')) {
              return <li key={note} data-category='key--black'>
                <button className='key key--black' onClick={handleKeyClick}>
                  {note}
                </button>
              </li>
            } else {
              return <li key={note} data-category='key--white'>
              <button className='key key--white' onClick={handleKeyClick}>
                {note}
              </button>
            </li>
            }
          })}
        </ul>
      </div>

      <div>
        <h2>Possible Scales</h2>
        <ul className='scales'>
          {notes.map(note => {
            if (notesInScale(note, activeNotes)) {
              return <li key={note} className='scale-btn'>
                <p>{note}</p>
              </li>
            } else {
              return <li key={note} className='scale-btn scale-btn--excluded'>
                <p>{note}</p>
              </li>
            }
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
