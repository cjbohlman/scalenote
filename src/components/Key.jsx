import './Key.css';

export default function Key({note, color, whiteKeysPassed, handleKeyClick}) {
  const keyWidth = 75;
  
  return <li key={note} className="key" data-category={color} style={color == 'black' ? { "left": `${((keyWidth + 1) * (whiteKeysPassed - 1)) + (keyWidth / 2)}px`} : {}}>
    <button className={`key__btn key__btn--${color}`} onClick={handleKeyClick}>
      {note}
    </button>
  </li>
};
