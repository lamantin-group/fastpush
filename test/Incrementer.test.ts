import { Incrementer } from '../src/model/increment/Incrementer'

describe(`patch increments`, () => {
  test(`should increment patch`, () => {
    const version = Incrementer.increment('0.0.0', 'patch')
    expect(version).toBe('0.0.1')
  })

  test(`should be 10 when was be 9`, () => {
    const version = Incrementer.increment('0.0.9', 'patch')
    expect(version).toBe('0.0.10')
  })

  test(`should increment patch and not modify minor or major`, () => {
    const version = Incrementer.increment('1.2.3', 'patch')
    expect(version).toBe('1.2.4')
  })
})

describe(`minor increments`, () => {
  test(`should increment minor and reset patch`, () => {
    const version = Incrementer.increment('1.2.3', 'minor')
    expect(version).toBe('1.3.0')
  })
})

describe(`major increments`, () => {
  test(`should increment major and reset minor and patch`, () => {
    const version = Incrementer.increment('1.2.3', 'major')
    expect(version).toBe('2.0.0')
  })
})

describe(`corner cases incremenet`, () => {
  test(`should return null if input empty`, () => {
    const version = Incrementer.increment('', 'minor')
    expect(version).toBe(null)
  })

  test(`should return null if input null`, () => {
    const version = Incrementer.increment(null, 'minor')
    expect(version).toBe(null)
  })

  test(`should return null if input undefined`, () => {
    const version = Incrementer.increment(undefined, 'minor')
    expect(version).toBe(null)
  })

  test(`should increment if version string bigger than 3 symbols`, () => {
    const version = Incrementer.increment('0.1.2.3', 'major')
    expect(version).toBe('1.0.0.0')
  })
})

describe(`version migration`, () => {
  test(`should migrate from 4 digits to 3 digits`, () => {
    const version = Incrementer.tryMigrateVersion('1.2.3.4')
    expect(version).toBe('1.2.3')
  })

  test(`should migrate from 2 digits to 3 digits`, () => {
    const version = Incrementer.tryMigrateVersion('1.2')
    expect(version).toBe('1.2.0')
  })

  test(`should not migrate if contains not numbers`, () => {
    const version = Incrementer.tryMigrateVersion('1.2.a')
    expect(version).toBe(null)
  })
})
