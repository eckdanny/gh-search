import React, { FC } from 'react'

export type BasicUserSearchFormProps<T = {}> = React.FormHTMLAttributes<
  HTMLFormElement
> & {
  // Nothing here yet!
} & T

const BasicUserSearchForm: FC<BasicUserSearchFormProps> = props => {
  return (
    <form {...props}>
      <label htmlFor="username-search-input">Username</label>
      <input
        id="username-search-input"
        type="search"
        placeholder="eckdanny"
        autoComplete="off"
      />
      <button type="submit">Search</button>
    </form>
  )
}

BasicUserSearchForm.defaultProps = {
  onSubmit: e => {
    e.preventDefault()
  },
}

export default BasicUserSearchForm
