import React, { FC, useRef } from 'react'

export type BasicUserSearchFormProps<T = {}> = React.FormHTMLAttributes<
  HTMLFormElement
> & {
  /** Overloading the `onChange` callback to use for the search form control */
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>
} & T

const BasicUserSearchForm: FC<BasicUserSearchFormProps> = ({
  onSubmit,
  onInputChange,
}) => {
  const inputRef = useRef(null)
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username-search-input">Username</label>
      <input
        ref={inputRef}
        id="username-search-input"
        type="search"
        placeholder="eckdanny"
        autoComplete="off"
        spellCheck={false}
        onChange={onInputChange}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default BasicUserSearchForm
