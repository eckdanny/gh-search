import React, { Fragment, useCallback } from 'react'
import cn from 'classnames'

type RootButtonBarProps = {
  roots: {
    flat: string
    sharp: string
  }[]
  value?: string
  onChange?: (value: string) => void
}

const RootButtonBar: React.FC<RootButtonBarProps> = ({
  roots,
  value,
  onChange,
}) => {
  return (
    <div
      className="btn-toolbar RootButtonBar"
      role="toolbar"
      aria-label="Root Toolbar"
    >
      {roots.map(({ flat, sharp }) => {
        return (
          <div
            key={`${flat}-${sharp}`}
            className="btn-group"
            role="group"
            aria-label="Third group"
          >
            {flat === sharp ? (
              <button
                type="button"
                onClick={() => onChange && onChange(sharp)}
                className={cn('btn btn-sm btn-outline-primary', {
                  active: value === sharp,
                })}
              >
                {sharp}
              </button>
            ) : (
              <Fragment>
                <button
                  type="button"
                  onClick={() => onChange && onChange(sharp)}
                  className={cn('btn btn-sm btn-outline-primary', {
                    active: value === sharp,
                  })}
                >
                  {sharp}
                </button>
                <button
                  type="button"
                  onClick={() => onChange && onChange(flat)}
                  className={cn('btn btn-sm btn-outline-primary', {
                    active: value === flat,
                  })}
                >
                  {flat}
                </button>
              </Fragment>
            )}
          </div>
        )
      })}
    </div>
  )
}

RootButtonBar.defaultProps = {
  onChange: () => {},
}

export default RootButtonBar
