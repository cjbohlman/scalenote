function Scale({heading, notes, notesInScale, activeNotes, generateScaleFunc}) {
  return <>
    <h3>{heading}</h3>
    <ul className='scales'>
      {notes.map(note => {
        return <li key={note} className={`scale-btn ${notesInScale(note, activeNotes, generateScaleFunc) && 'scale-btn--excluded'}`}>
          <p>{note}</p>
        </li>
      })}
    </ul>
  </>
}

export default Scale
