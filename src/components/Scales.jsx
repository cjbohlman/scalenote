import './Scales.css';

export default function Scales({heading, notes, activeNotes, generateScaleFunc}) {

  /*
   * Given a scale root note and scale generator function:
   * return true if currently selected notes are all in generated scale
   * return false otherwise
   */
  const notesInScale = (scaleRoot, scaleGeneratorFunc) => {
    return activeNotes.every(note => scaleGeneratorFunc(scaleRoot).includes(note));
  };

  return <>
    <h3>{heading}</h3>
    <ul className='scales'>
      {notes.map(note => {
        return <li key={note} className={`scale-btn ${activeNotes.length && notesInScale(note, generateScaleFunc) && 'scale-btn--valid'}`}>
          <p>{note}</p>
        </li>
      })}
    </ul>
  </>
};
