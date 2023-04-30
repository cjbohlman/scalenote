import './Piano.css'
import Key from './Key'
import { Fragment } from "react";


export default function Piano({notes, handleKeyClick}) {
  let whiteKeysPassed = 0;

  return <>
    <ul className='piano'>
      {notes.map(note => {
        let color = ''
        if (!note.includes('#')) {
          whiteKeysPassed += 1;
          color = 'white'
        } else {
          color = 'black'
        }
        return <Fragment key={note}>
          <Key
            note={note}
            color={color}
            whiteKeysPassed={whiteKeysPassed}
            handleKeyClick={handleKeyClick}
          />
        </Fragment>
      })}
    </ul>
  </>
};