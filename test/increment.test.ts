import { increment, tryMigrateVersion } from '../src/model/increment'

describe(`patch increments`, () => {
  test(`should increment patch`, () => {
    const version = increment('0.0.0', 'patch')
    expect(version).toBe('0.0.1')
  })

  test(`should be 10 when was be 9`, () => {
    const version = increment('0.0.9', 'patch')
    expect(version).toBe('0.0.10')
  })

  test(`should increment patch and not modify minor or major`, () => {
    const version = increment('1.2.3', 'patch')
    expect(version).toBe('1.2.4')
  })
})

describe(`minor increments`, () => {
  test(`should increment minor and reset patch`, () => {
    const version = increment('1.2.3', 'minor')
    expect(version).toBe('1.3.0')
  })
})

describe(`major increments`, () => {
  test(`should increment major and reset minor and patch`, () => {
    const version = increment('1.2.3', 'major')
    expect(version).toBe('2.0.0')
  })
})

describe(`corner cases incremenet`, () => {
  test(`should return null if input empty`, () => {
    const version = increment('', 'minor')
    expect(version).toBe(null)
  })

  test(`should return null if input null`, () => {
    const version = increment(null, 'minor')
    expect(version).toBe(null)
  })

  test(`should return null if input undefined`, () => {
    const version = increment(undefined, 'minor')
    expect(version).toBe(null)
  })

  test(`should increment if version string bigger than 3 symbols`, () => {
    const version = increment('0.1.2.3', 'major')
    expect(version).toBe('1.0.0.0')
  })
})

describe(`version migration`, () => {
  test(`should migrate from 4 digits to 3 digits`, () => {
    const version = tryMigrateVersion('1.2.3.4')
    expect(version).toBe('1.2.3')
  })

  test(`should migrate from 2 digits to 3 digits`, () => {
    const version = tryMigrateVersion('1.2')
    expect(version).toBe('1.2.0')
  })

  test(`should not migrate if contains not numbers`, () => {
    const version = tryMigrateVersion('1.2.a')
    expect(version).toBe(null)
  })
})
