import React, { useEffect, useRef, useState } from 'react'
import { sharps, flats, modes } from './constants'
import { combineLatest, from, zip, BehaviorSubject } from 'rxjs'
import { startWith, map, toArray, tap } from 'rxjs/operators'
import RootButtonBar from './RootButtonBar'
import ToolbarButton from './ToolbarButton'
import Keyboard from './Keyboard'
import { getMode } from './utils'
import './style.scss'

type State = {
  root: string
  mode: string
  options: {
    roots: { sharp: string; flat: string }[]
    modes: string[]
  }
  notes?: any[]
}

const initialState = {
  root: '',
  mode: '',
  options: {
    roots: [],
    modes: [],
  },
}

const Scales: React.FC = () => {
  const [state, setState] = useState<State>(initialState)

  const rootInput$ = useRef(new BehaviorSubject<string>(initialState.root))
  const modeInput$ = useRef(new BehaviorSubject<string>(initialState.mode))

  useEffect(() => {
    //
    // Static Options
    //

    const rootOptions$ = zip(from(sharps), from(flats)).pipe(
      map(([sharp, flat]) => ({ sharp, flat })),
      toArray()
    )

    const modeOptions$ = from([modes])

    const options$ = combineLatest(
      rootOptions$,
      modeOptions$,
      (roots, modes) => ({ roots, modes })
    )

    //
    // Inputs
    //

    const root$ = rootInput$.current
      .asObservable()
      .pipe(startWith(initialState.root))

    const mode$ = modeInput$.current
      .asObservable()
      .pipe(startWith(initialState.mode))

    //
    // Derived Values
    //

    const notes$ = combineLatest(root$, mode$).pipe(
      map(([root, mode]) => {
        if (!root || !mode) return undefined
        return getMode(root, mode)
      })
    )

    //
    // State Pump
    //

    const state$ = combineLatest(
      root$,
      mode$,
      options$,
      notes$,
      (root, mode, options, notes) => ({ root, mode, options, notes })
    ).subscribe(state => setState(state))

    return () => state$.unsubscribe()
  }, [rootInput$, modeInput$])

  return (
    <div className="container">
      <form onSubmit={e => e.preventDefault()}>
        <div className="form-group">
          <label>Key</label>
          <RootButtonBar
            value={state.root}
            roots={state.options.roots}
            onChange={value => rootInput$.current.next(value)}
          />
        </div>

        <div className="form-group">
          <label>Mode</label>
          <ToolbarButton
            options={state.options.modes}
            value={state.mode}
            onChange={value => modeInput$.current.next(value)}
          />
        </div>
      </form>

      {state.notes && (
        <div>
          <label>Notes</label>
          <Keyboard notes={state.notes} />
        </div>
      )}

      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  )
}

export default Scales
