import React from 'react'
import cn from 'classnames'
import Styles from './Button.module.scss'

type ButtonProps<T = {}> = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // nothing here yet
} & T

const Button: React.FC<ButtonProps> = props => (
  <button
    {...props}
    className={cn(props.className, {
      [Styles['btn']]: true,
      [Styles['btn-secondary']]: true,
      [Styles['btn-sm']]: true,
    })}
  />
)

export default Button
