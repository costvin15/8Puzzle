import prompt from 'prompt'

/**
 * Classe representando o ambiente e seu estado
 */
function Ambiente() {
  // Posição da peça vazia neste ambiente
  this.position = {x: 0, y: 0}
  // Representação do ambiente
  this.matriz = null
  /**
   * Através da entrada do usuário, o ambiente é preenchido com
   * a informação inserida.
   * 
   * @returns {Promise<Ambiente>}
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
   * Copia os dados do ambiente parâmetro para este ambiente.
   * Necessário para a implementação pois um objeto em Node.JS
   * é um ponteiro.
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
  /**
   * Exibe o tabuleiro de forma gráfica na saída padrão
   */
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
