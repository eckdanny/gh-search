import React from 'react'

type InputProps<T = {}> = React.InputHTMLAttributes<HTMLInputElement> & {
  // nothing here yet
} & T

const Input: React.FC<InputProps> = props => <input {...props} />

export default Input
