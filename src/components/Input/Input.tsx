import React from 'react'
import cn from 'classnames'

type InputProps<T = {}> = React.InputHTMLAttributes<HTMLInputElement> & {
  // nothing here yet
} & T

const Input: React.FC<InputProps> = props => <input {...props} />

export default Input
