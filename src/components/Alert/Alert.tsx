import React from 'react'
import cn from 'classnames'
import Styles from './Alert.module.scss'

export type AlertProps<T = {}> = React.HTMLAttributes<HTMLDivElement> & {
  // nothing here yet
} & T

const Alert: React.FC<AlertProps> = props => (
  <div
    className={cn(Styles['alert'], Styles['alert-danger'])}
    role="alert"
    {...props}
  />
)

export default Alert
