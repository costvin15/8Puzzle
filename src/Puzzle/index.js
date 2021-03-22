import Ambiente from '../Ambiente'

/**
 * @param {Ambiente} ambiente 
 */
function Puzzle(ambiente) {
  this.ambiente = ambiente

  /**
   * @param {string} direction 
   */
   this.move = (direction) => {
    switch (direction) {
      case 'up':
        if (this.ambiente.position.y === 0) {
          throw new Error('Unable to move')
        }
        
        const piece = this.ambiente.matriz[this.ambiente.position.y + 1][this.ambiente.position.x]
        const current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]

        this.ambiente.matriz[this.ambiente.position.y + 1][this.ambiente.position.x] = current
        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece

        break
      case 'down':
        if (this.ambiente.position.y === 2) {
          throw new Error('Unable to move')
        }

        const piece = this.ambiente.matriz[this.ambiente.position.y - 1][this.ambiente.position.x]
        const current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]

        this.ambiente.matriz[this.ambiente.position.y - 1][this.ambiente.position.x] = current
        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece

        break
      case 'left':
        if (this.ambiente.position.x === 0) {
          throw new Error('Unable to move')
        }

        const piece = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x + 1]
        const current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]

        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x + 1] = current
        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece

        break
      case 'right':
        if (this.ambiente.position.x === 2) {
          throw new Error('Unable to move')
        }
        
        const piece = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x - 1]
        const current = this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x]

        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x - 1] = current
        this.ambiente.matriz[this.ambiente.position.y][this.ambiente.position.x] = piece

        break
      default:
        throw new Error('Command not recognized')
    }
  }
}

export default Puzzle
