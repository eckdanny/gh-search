import React from 'react'
import cn from 'classnames'
import Styles from './Button.module.scss'

type ButtonProps<T = {}> = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // nothing here yet
} & T

const Button: React.FC<ButtonProps> = props => (
  <button
    {...props}
    className={cn(props.className, 'btn btn-primary', Styles.Button)}
  />
)

export default Button
