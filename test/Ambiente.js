const robotJs = require('robotjs')

/**
 * @param {Array} inputs Array containing the entries, each item is a line
 */
const userInput = inputs => {
  inputs.forEach(input => {
    robotJs.typeString(input)
    robotJs.keyTap('enter')
  })
}

describe('Ambient', () => {
  describe('Create', () => {
    it('Creating ambient', () => {
    })
  })
})