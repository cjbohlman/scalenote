import { useState } from 'react'
import './App.css'

function App() {
  console.log('render')
  const [activeNotes, setActiveNotes] = useState([])
  let whiteKeysPassed = 0;

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
    e.target.classList.toggle('key__btn--selected');
    if (activeNotes.includes(e.target.textContent)) {
      setActiveNotes(activeNotes.filter(note => note !== e.target.textContent));
    } else {
      setActiveNotes([...activeNotes, e.target.textContent]);
    }
  };

  const generateNaturalMajorScaleNotes = (scaleRoot) => {
    const scale = [scaleRoot]
    let idx = notes.indexOf(scaleRoot);
    // Intervals: whole step, whole step, half step, whole step, whole step, whole step
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

  const generateNaturalMinorScaleNotes = (scaleRoot) => {
    const scale = [scaleRoot]
    let idx = notes.indexOf(scaleRoot);
    // Interval: whole, half, whole, whole, half, whole, whole
    idx = (idx + 2) % notes.length;
    scale.push(notes[idx]);
    idx = (idx + 1) % notes.length;
    scale.push(notes[idx]);
    idx = (idx + 2) % notes.length;
    scale.push(notes[idx]);
    idx = (idx + 2) % notes.length;
    scale.push(notes[idx]);
    idx = (idx + 1) % notes.length;
    scale.push(notes[idx]);
    idx = (idx + 2) % notes.length;
    scale.push(notes[idx]);
    return scale;
  };

  const notesInScale = (scaleRoot, selectedNotes, scaleGeneratorFunc) => {
    const scaleNotes = scaleGeneratorFunc(scaleRoot);
    return selectedNotes.filter(note => !scaleNotes.includes(note)).length == 0;
  };

  return (
    <div className="App">
      <h1>ScaleNote</h1>
      <h2>Find music scales from selected piano notes</h2>

      <div>
        <h3>Notes</h3>
        <ul className='piano'>
          {notes.map(note => {
            if (note.includes('#')) {
              return <li key={note} className="key" data-category='black' style={{ "left": `${(75 * (whiteKeysPassed - 1)) + 37.5}px`}}>
                <button className='key__btn key__btn--black' onClick={handleKeyClick}>
                  <p>{note}</p>
                </button>
              </li>
            } else {
              whiteKeysPassed += 1;
              return <li key={note} className="key" data-category='white'>
              <button className='key__btn key__btn--white' onClick={handleKeyClick}>
                <p>{note}</p>
              </button>
            </li>
            }
          })}
        </ul>
      </div>

      <div>
        <h3>Possible Natural Major Scales</h3>
        <ul className='scales'>
          {notes.map(note => {
            if (notesInScale(note, activeNotes, generateNaturalMajorScaleNotes)) {
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

      <div>
        <h3>Possible Natural Minor Scales</h3>
        <ul className='scales'>
          {notes.map(note => {
            if (notesInScale(note, activeNotes, generateNaturalMinorScaleNotes)) {
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
