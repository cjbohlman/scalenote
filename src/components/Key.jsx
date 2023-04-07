function Key({note, color, whiteKeysPassed, handleKeyClick}) {
  return <>
    <li key={note} className="key" data-category={color} style={color == 'black' ? { "left": `${(75 * (whiteKeysPassed - 1)) + 37.5}px`} : {}}>
      <button className={`key__btn key__btn--${color}`} onClick={handleKeyClick}>
        <p>{note}</p>
      </button>
    </li>
  </>
}

export default Key
