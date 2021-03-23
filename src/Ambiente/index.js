import prompt from 'prompt'

function Ambiente() {
  this.position = {x: 0, y: 0}
  this.matriz = null
  /**
   * Creates an Ambiente object
   * @returns {Promise<Ambiente>} Ambiente Object
   */
  this.creates = async () => {
    prompt.start()

    try {
      const inputs = await prompt.get(['line1', 'line2', 'line3'])
      const matriz = new Array(3)
        .fill()
        .map(() => new Array(3).fill())
      
      var i = 0
      Object.keys(inputs).map(item => {
        const line = inputs[item].split(' ').map((value, index) => {
          if (value === '_') {
            this.position = {
              x: index,
              y: i,
            }
            return Number.NEGATIVE_INFINITY
          }

          return parseInt(value, 10)
        })
        line.map((input, index) => {
          matriz[i][index] = input
        })

        i++
      })

      this.matriz = matriz
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * 
   * @param {Ambiente} ambiente 
   */
  this.copy = (ambiente) => {
    this.matriz = new Array(3)
        .fill()
        .map(() => new Array(3).fill())
    ambiente.matriz.map((line, index) => {
      this.matriz[index] = [...line]
    })
    this.position.x = ambiente.position.x
    this.position.y = ambiente.position.y
  }
  this.display = () => {
    const matriz = this.matriz
    matriz.map(line => {
      line.map(value => {
        if (value === Number.NEGATIVE_INFINITY) {
          process.stdout.write('  ')
        } else {
          process.stdout.write(`${value} `)
        }
      })

      process.stdout.write('\n')
    })
  }
}

export default Ambiente
