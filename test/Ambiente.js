const expect = chai.expect
const robotJs = require('robotjs')
const {Ambiente} = require('../src')

/**
 * @param {Array} inputs Array containing the entries, each item is a line
 */
const userInput = inputs => {
  inputs.forEach(input => {
    robotJs.typeString(input)
    robotJs.keyTap('enter')
  })
}

describe('Ambiente', () => {
  describe('Create', () => {
    it('Creating ambiente', async () => {
      userInput(['7', '2', '4'])
      userInput(['5', '_', '6'])
      userInput(['8', '3', '1'])
      const ambiente = await Ambiente.create()
    })
  })
})