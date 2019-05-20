import React, { useRef, useEffect, useState } from 'react'
import { timer } from 'rxjs'
import { Button } from '../../components'

type ExploringLifecyclesWithHooksProps<T = {}> = {
  // nothing here yet
} & T

const ExploringLifecyclesWithHooks: React.FC<
  ExploringLifecyclesWithHooksProps
> = () => {
  /**
   * Just a dumb getter/setter for a hunk of state
   */
  const [count, setCount] = useState(0)

  /**
   * Just plain 'ol refs for the use case I'm familiar
   */
  const renderLifeEl = useRef<HTMLSpanElement>(null!)
  const componentLifeEl = useRef<HTMLSpanElement>(null!)

  /**
   * Refs for instance properties? Yes! Refs are the appropriate thing to use for
   * mutable things like this. _Subscriptions_ would need tear-down, but the observable
   * shouldn't need a destructor or `componentWillUnmount`.
   */
  const renderLife$ = useRef(timer(0, 1000))

  /**
   * A garden variety effect. Setup/teardown occurs on each render because the
   * deplist is not exhaustive. The subscription is local to this function, so we don't
   * need to manage its lifecycle elsewhere.
   */
  useEffect(() => {
    const subscription = renderLife$.current.subscribe(
      x => (renderLifeEl.current.innerText = x.toString())
    )
    return () => subscription.unsubscribe()
  })

  /**
   * Explicit dep (of ref). This should share the lifecycle of the component itself.
   * (Run once per component lifespan). Better than 'lying to react' an en explicit [].
   */
  useEffect(() => {
    const componentLife$ = timer(0, 1000).subscribe(
      x => (componentLifeEl.current.innerText = x.toString())
    )
    return () => componentLife$.unsubscribe()
  }, [componentLifeEl])

  /**
   * 🤔 What if a subscription was shared? To clean up, a snippet
   * like `useEffect(() => () => thing$.current.unsubscribe())` would, but it smells
   */

  return (
    <div className="border border-primary p-3">
      <p>
        clicked the button: <code>{count}</code> times ( &lt;={' '}
        <code>count</code>)
      </p>
      <p>
        this render is <code ref={renderLifeEl} /> seconds old
      </p>
      <p>
        the component is <code ref={componentLifeEl} /> seconds old
      </p>
      <p>
        This button increments <code>count</code> and triggers a re-render:
      </p>
      <Button onClick={() => setCount(c => c + 1)} size="sm" color="info">
        Increment
      </Button>
    </div>
  )
}

const Demo: React.FC = () => {
  const [doRender, setDoRender] = useState(true)

  return (
    <div className="container mt-3">
      <Button
        type="button"
        color="primary"
        size="sm"
        outline
        onClick={() => setDoRender(prev => !prev)}
        className="mb-3"
      >
        Toggle
      </Button>
      {doRender ? (
        <ExploringLifecyclesWithHooks />
      ) : (
        <div>Component was unmounted</div>
      )}
    </div>
  )
}

export default Demo
