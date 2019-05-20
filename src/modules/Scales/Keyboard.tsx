import React from 'react'
import cn from 'classnames'
import Styles from './Keyboard.module.scss'

type KeyboardProps = {
  notes: string[]
}

const Keyboard: React.FC<KeyboardProps> = props => {
  return (
    <div className={Styles.Keyboard}>
      {props.notes.map((d, i) => (
        <button
          key={i}
          className={cn('btn', 'btn-outline-primary', Styles.Key)}
        >
          {d}
        </button>
      ))}
    </div>
  )
}

export default Keyboard
