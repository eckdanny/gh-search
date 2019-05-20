import React, { ReactNode } from 'react'
import cn from 'classnames'

type ToolbarButtonProps<T = {}, V = string> = {
  options: V[]
  value: V
  onChange?: (value: V) => void
} & T

const defaultProps: Partial<ToolbarButtonProps> = {
  // renderButton: () =>
}

const ToolbarButton: React.FC<ToolbarButtonProps> = props => {
  return (
    <div
      className="btn-toolbar RootButtonBar"
      role="toolbar"
      aria-label="Root Toolbar"
    >
      <div className="btn-group" role="group" aria-label="Third group">
        {props.options &&
          props.options.map(option => {
            return (
              <button
                type="button"
                key={option}
                onClick={() => props.onChange && props.onChange(option)}
                className={cn('btn btn-sm btn-outline-primary', {
                  active: option === props.value,
                })}
              >
                {option}
              </button>
            )
          })}
      </div>
    </div>
  )
}

ToolbarButton.defaultProps = defaultProps

export default ToolbarButton
