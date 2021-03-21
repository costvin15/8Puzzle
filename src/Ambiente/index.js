import prompt from 'prompt'

function Ambiente() {
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
        .fill(Number.NEGATIVE_INFINITY)
        .map(() => new Array(3))
      
      var i = 0
      Object.keys(inputs).map(item => {
        const line = inputs[item].split(' ').map(value => {
          if (value === '_') {
            return Number.NEGATIVE_INFINITY
          }

          return parseInt(value, 10)
        })
        line.map(input => {
          matriz[i].push(input)
        })

        i++
      })

      this.matriz = matriz
    } catch (error) {
      console.error(error)
    }
  }
  this.display = () => {
    const matriz = this.matriz
    matriz.map(line => {
      line.map(value => {
        if (value === Number.NEGATIVE_INFINITY) {
          process.stdout.write(' ')
        } else {
          process.stdout.write(`${value} `)
        }
      })

      process.stdout.write('\n')
    })
  }
}

export default Ambiente
