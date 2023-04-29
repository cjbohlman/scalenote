import { Fragment } from "react"
function Key({note, color, whiteKeysPassed, handleKeyClick}) {
  return <Fragment key={note}>
    <li key={note} className="key" data-category={color} style={color == 'black' ? { "left": `${(75 * (whiteKeysPassed - 1)) + 37.5}px`} : {}}>
      <button className={`key__btn key__btn--${color}`} onClick={handleKeyClick}>
        {note}
      </button>
    </li>
  </Fragment>
}

export default Key
