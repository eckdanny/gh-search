import React from 'react'
import cn from 'classnames'
import Styles from './Spinner.module.scss'

type SpinnerProps<T = {}> = React.HTMLAttributes<HTMLDivElement> & {
  // nothing here yet
} & T

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div className={cn(className, [Styles['spinner-border']])} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner
