import { add } from '../src/add'

describe('add', () => {
  it('should have startProgram available', () => {
    const r = add(1, 2)
    expect(r).toBe(3)
  })
})
