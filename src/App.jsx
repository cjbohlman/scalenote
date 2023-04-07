import { useState } from 'react'
import './App.css'
import Key from './components/Key';
import Scale from './components/Scale';

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
            let color = ''
            if (!note.includes('#')) {
              whiteKeysPassed += 1;
              color = 'white'
            } else {
              color = 'black'
            }
            return <Key
              note={note}
              color={color}
              whiteKeysPassed={whiteKeysPassed}
              handleKeyClick={handleKeyClick}
            />
          })}
        </ul>
      </div>

      <div>
        <Scale
          heading='Possible Natural Major Scales'
          notes={notes}
          notesInScale={notesInScale}
          activeNotes={activeNotes}
          generateScaleFunc={generateNaturalMajorScaleNotes}/>
      </div>

      <div>
        <Scale
          heading='Possible Natural Minor Scales'
          notes={notes}
          notesInScale={notesInScale}
          activeNotes={activeNotes}
          generateScaleFunc={generateNaturalMinorScaleNotes}/>
      </div>
    </div>
  )
}

export default App
