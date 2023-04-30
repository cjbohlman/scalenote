import { useState } from 'react';
import './App.css';
import Scales from './components/Scales';
import Piano from './components/Piano';

function App() {
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
    e.target.classList.toggle('key__btn--selected');
    if (activeNotes.includes(e.target.textContent)) {
      setActiveNotes(activeNotes.filter(note => note !== e.target.textContent));
    } else {
      setActiveNotes([...activeNotes, e.target.textContent]);
    }
  };

  // Intervals: whole step, whole step, half step, whole step, whole step, whole step
  const generateNaturalMajorScaleNotes = scaleRoot => {
    const scale = [scaleRoot]
    let idx = notes.indexOf(scaleRoot);
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

  // Interval: whole step, half step, whole step, whole step, half step, whole step, whole step
  const generateNaturalMinorScaleNotes = scaleRoot => {
    const scale = [scaleRoot]
    let idx = notes.indexOf(scaleRoot);
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

  return (
    <div className="App">
      <h1>ScaleNote</h1>
      <h2>Find valid music scales from selected piano notes</h2>

      <div className='piano-container'>
        <Piano 
          notes={notes}
          handleKeyClick={handleKeyClick}
        />
      </div>

      <div className='scales-container'>
        <Scales
          heading='Possible Natural Major Scales'
          notes={notes}
          activeNotes={activeNotes}
          generateScaleFunc={generateNaturalMajorScaleNotes}
        />
      </div>

      <div className='scales-container'>
        <Scales
          heading='Possible Natural Minor Scales'
          notes={notes}
          activeNotes={activeNotes}
          generateScaleFunc={generateNaturalMinorScaleNotes}
        />
      </div>
    </div>
  )
}

export default App;
