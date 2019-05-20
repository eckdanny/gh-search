import { getKeySignature, getDomain, getMode } from './utils'

describe('this test suite', () => {
  it('passes', () => {
    expect(true).toBe(true)
  })
})

describe('getKeySignature', () => {
  it('works', () => {
    expect(getKeySignature('C')).toBe('flat')
    expect(getKeySignature('C', true)).toBe('sharp')
    expect(getKeySignature('G♯')).toBe('sharp')
    expect(getKeySignature('G♯', true)).toBe('sharp')
    expect(getKeySignature('G♭')).toBe('flat')
    expect(getKeySignature('G♭', true)).toBe('flat')
    expect(() => getKeySignature('H')).toThrow()
    expect(() => getKeySignature('')).toThrow()
  })
})

describe('getRange', () => {
  it('works', () => {
    expect(getDomain('G♯').length).toBe(12)
    expect(getDomain('G♯')[0]).toBe('G♯')
    expect(getDomain('C')[0]).toBe('C')
  })
})

describe('createScale', () => {
  it.each`
    root   | mode
    ${'C'} | ${'Ionion'}
    ${'D'} | ${'Dorian'}
    ${'E'} | ${'Phrygian'}
    ${'F'} | ${'Lydian'}
    ${'G'} | ${'Mixolydian'}
    ${'A'} | ${'Aeolian'}
    ${'B'} | ${'Locrian'}
  `('constructs $root $mode', ({ root, mode }) => {
    const result = getMode(root, mode)
    expect(result).toHaveLength(8)
    for (const note of ['C', 'D', 'E', 'F', 'G', 'A', 'B']) {
      expect(result).toContain(note)
    }
  })

  it('does other roots', () => {
    expect(getMode('E♭')).toEqual(['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D', 'E♭'])
  })

  it('does other modes', () => {
    expect(getMode('E♭', 'Dorian')).toEqual([
      'E♭',
      'F',
      'G♭',
      'A♭',
      'B♭',
      'C',
      'D♭',
      'E♭',
    ])
  })
})
