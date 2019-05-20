import { flats, sharps, intervals, modes } from './constants'

/**
 * Determine whether the _key signature_ is `sharp` or `flat`
 *
 * If `key` does not belong to exclusively to either the `flat`
 * or `sharp` key signature (e.g.; `C`), one may use the 2nd
 * positional argument.
 * @param key A valid `key` (may include '♯' or '♭' suffix)
 * @param preferSharp Specify preference for the `sharp` key signature
 */
export const getKeySignature = (
  key: string,
  preferSharp: boolean = false
): 'flat' | 'sharp' => {
  let keySignatureMappers: [(key: string) => boolean, 'flat' | 'sharp'][] = [
    [key => flats.includes(key), 'flat'],
    [key => sharps.includes(key), 'sharp'],
  ]
  if (preferSharp) keySignatureMappers.reverse()
  for (const [fn, msg] of keySignatureMappers) {
    if (fn(key)) return msg
  }
  throw new Error('Invalid Argument: `root` does not appear to be valid')
}

/**
 * Get the notes that make up the major scale by `key`
 * @param key A valid `key` (may include '♯' or '♭' suffix)
 * @param preferSharp Specify preference for the `sharp` key signature
 */
export const getDomain = (
  key: string,
  preferSharp: boolean = false
): string[] => {
  const domain = getKeySignature(key, preferSharp) === 'flat' ? flats : sharps
  const index = domain.findIndex(value => value === key)
  return [...domain.slice(index), ...domain.slice(0, index)]
}

/**
 * Get the sequence of notes that make up a `mode`
 * @param key A valid `key` (may include '♯' or '♭' suffix)
 * @param mode A valid `mode` (e.g.; 'Ionion', 'Dorian', ...)
 */
export const getMode = (key: string, mode: string = 'Ionion'): string[] => {
  const domain = getDomain(key)
  const offset = modes.indexOf(mode)
  const steps =
    offset > 0
      ? [...intervals.slice(offset), ...intervals.slice(0, offset)]
      : intervals
  let notes = [domain[0]]
  let step = 0
  for (let i = 0; i < steps.length; i++) {
    const amount = steps[i]
    step += amount
    notes.push(domain[step % 12])
  }
  return notes
}
