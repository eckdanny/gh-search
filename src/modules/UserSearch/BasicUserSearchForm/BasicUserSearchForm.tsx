import React, { FC, useRef } from 'react'

export type BasicUserSearchFormProps<T = {}> = React.FormHTMLAttributes<
  HTMLFormElement
> & {
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>
  inputValue?: string
} & T

const BasicUserSearchForm: FC<BasicUserSearchFormProps> = ({
  onSubmit,
  inputValue,
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
        value={inputValue}
        onChange={onInputChange}
      />
      <button type="submit">Search</button>
      <div>
        your query:
        <code>{inputValue}</code>
      </div>
    </form>
  )
}

export default BasicUserSearchForm
