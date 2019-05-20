import React from 'react'
import cn from 'classnames'
import Styles from './Button.module.scss'

type COLORS =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'white'

type ButtonProps<T = {}> = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'lg'
  color?: COLORS
  outline?: boolean
} & T

const defaultProps: ButtonProps = {
  color: 'secondary',
}

const Button: React.FC<ButtonProps> = props => {
  const [classes, passProps] = getClasses(props)
  return (
    <button
      {...passProps}
      className={cn(props.className, {
        [Styles['btn']]: true,
        ...classes,
      })}
    />
  )
}

Button.defaultProps = defaultProps

export default Button

//
// Helpers
//

function getClasses(
  props: ButtonProps
): [{ [key: string]: boolean }, ButtonProps] {
  const { size, color, outline, ...restProps } = props
  return [
    {
      [Styles[`btn-${color}`]]: !outline && !!color,
      [Styles[`btn-${size}`]]: !!size,
      [Styles[`btn-outline-${color}`]]: !!outline && !!color,
    },
    restProps,
  ]
}
