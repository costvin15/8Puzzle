import Ambiente from '../Ambiente'

/**
 * @param {Ambiente} ambiente 
 */
function Puzzle(ambiente) {
  this.ambiente = ambiente

  /**
   * @param {string} direction 
   */
   this.move = direction => {
    var current = null, piece = null

    switch (direction) {
      case 'up':
        if (this.ambiente.position.y === 0) {
          throw new Error('Unable to move')
        }

        current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]
        piece = this.ambiente.matriz[this.ambiente.position.y - 1][this.ambiente.position.x]

        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece
        this.ambiente.matriz[this.ambiente.position.y - 1][this.ambiente.position.x] = current
        this.ambiente.position.y--

        break
      case 'down':
        if (this.ambiente.position.y === 2) {
          throw new Error('Unable to move')
        }

        current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]
        piece = this.ambiente.matriz[this.ambiente.position.y + 1][this.ambiente.position.x]

        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece
        this.ambiente.matriz[this.ambiente.position.y + 1][this.ambiente.position.x] = current
        this.ambiente.position.y++

        break
      case 'left':
        if (this.ambiente.position.x === 0) {
          throw new Error('Unable to move')
        }

        current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]
        piece = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x - 1]

        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece
        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x - 1] = current
        this.ambiente.position.x--

        break
      case 'right':
        if (this.ambiente.position.x === 2) {
          throw new Error('Unable to move')
        }

        current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]
        piece = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x + 1]

        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece
        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x + 1] = current
        this.ambiente.position.x++

        break
      default:
        throw new Error('Command not recognized')
    }
  }
  this.verify = () => {
    for (let i = 0; i < this.ambiente.matriz.length; i++) {
      for (let j = 0; j < this.ambiente.matriz[i].length; j++) {
        if (this.ambiente.matriz[i][j] !== Number.NEGATIVE_INFINITY &&
            this.ambiente.matriz[i][j] !== j + i * 3 + 1) {
          return false
        }
      }
    }

    return true
  }
  /**
   * 
   * @param {Puzzle} puzzle 
   */
  this.compare = (puzzle) => {
    for (let i = 0; i < this.ambiente.matriz.length; i++) {
      for (let j = 0; j < this.ambiente.matriz[i].length; j++) {
        if (this.ambiente.matriz[i][j] !== puzzle.ambiente.matriz[i][j]) {
          return false
        }
      }
    }

    return true
  }
}

export default Puzzle
