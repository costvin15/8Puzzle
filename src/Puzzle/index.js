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
    var piece = null, current = null

    switch (direction) {
      case 'up':
        if (this.ambiente.position.y === 0) {
          throw new Error('Unable to move')
        }
        
        piece = this.ambiente.matriz[this.ambiente.position.y + 1][this.ambiente.position.x]
        current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]

        this.ambiente.matriz[this.ambiente.position.y + 1][this.ambiente.position.x] = current
        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece

        break
      case 'down':
        if (this.ambiente.position.y === 2) {
          throw new Error('Unable to move')
        }

        piece = this.ambiente.matriz[this.ambiente.position.y - 1][this.ambiente.position.x]
        current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]

        this.ambiente.matriz[this.ambiente.position.y - 1][this.ambiente.position.x] = current
        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece

        break
      case 'left':
        if (this.ambiente.position.x === 0) {
          throw new Error('Unable to move')
        }

        piece = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x + 1]
        current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]

        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x + 1] = current
        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece

        break
      case 'right':
        if (this.ambiente.position.x === 2) {
          throw new Error('Unable to move')
        }
        
        piece = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x - 1]
        current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]

        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x - 1] = current
        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece

        break
      default:
        throw new Error('Command not recognized')
    }
  }
  this.verify = () => {
    for (let i = 0; i < this.ambiente.matriz.length; i++) {
      for (let j = 0; j < this.ambiente.matriz[i].length; j++) {
        if (this.ambiente.matriz[i][j] !== Number.NEGATIVE_INFINITY &&
          this.ambiente.matriz[i][j] !== (j + 1) + (i * 3)) {
          return false
        }
      }
    }

    return true
  }
}

export default Puzzle
