import {Ambiente, Puzzle} from '..'

/**
 * Nó da árvore de busca
 * 
 * @param {Ambiente} ambiente
 */
function Node(ambiente, level = 0, parent = null) {
  this.ambiente = ambiente
  this.puzzle = new Puzzle(ambiente)
  this.level = level
  this.parent = parent

  /**
   * Esta função testa todos os movimentos possíveis, criando um tabuleiro
   * para cada, e verificando se o movimento é possível. Caso o movimento
   * não seja possível, uma exceção será capturada nessa função.
   * 
   * @returns {Array<Puzzle>} Next steps
   */
  this.possiblesteps = () => {
    const steps = []
    const directions = ['up', 'down', 'left', 'right']

    directions.map(direction => {
      const customAmbiente = new Ambiente()
      customAmbiente.copy(this.ambiente)
      const puzzle = new Puzzle(customAmbiente)
      try {
        puzzle.move(direction)
        steps.push(puzzle)
      } catch (error) {
        // console.info(error)
      }
    })
    
    return steps
  }
  /**
   * Calcula a função heurística comparando o tabuleiro atual
   * com o tabuleiro desejado. Cada peça (exceto a peça vazia)
   * fora do lugar incrementa o valor heurístico. Caso o valor
   * heurístico seja 0, o tabuleiro é igual ao tabuleiro desejado
   * 
   * @returns {int} Heuristic value
   */
  this.heuristic = () => {
    let counter = 0
    for (let i = 0; i < this.ambiente.matriz.length; i++) {
      for (let j = 0; j < this.ambiente.matriz[i].length; j++) {
        if (this.ambiente.matriz[i][j] !== Number.NEGATIVE_INFINITY &&
            this.ambiente.matriz[i][j] !== j + i * 3 + 1) {
          counter++ 
        }
      }
    }
    return counter
  }
  this.evaluation = () => {
    return this.heuristic() + this.level
  }
}

function Search() {
  /**
   * Executa uma busca A*
   */
  this.perform =  async () => {
    const expanded = [], nonexpanded = [], path = []

    // Inserindo o tabuleiro informado pelo usuário na árvore
    const rootAmbiente = new Ambiente()
    await rootAmbiente.creates()
    const root = new Node(rootAmbiente)
    nonexpanded.push(root)

    while (nonexpanded.length !== 0) {
      const current = nonexpanded.shift()

      // Condição de parada da busca
      if (current.puzzle.verify()) {
        path.push(current)
        break
      }

      // Buscando todas os movimentos possíveis e adicionando-os na árvore caso já não estejam
      const next = current.possiblesteps()
      next.map(puzzle => {
        let isAlreadyInTree = false
        nonexpanded.map(node => {
          if (current.puzzle.compare(node.puzzle)) {
            isAlreadyInTree = true
          }
        })

        if (!isAlreadyInTree) {
          const node = new Node(puzzle.ambiente, current.level + 1, current)
          nonexpanded.push(node)
        }
      })

      // Ordenando os nós não-expandidos com base na função de avalição f(n) = g(n) + h(n)
      nonexpanded.sort((a, b) => a.evaluation() - b.evaluation())
      // Adicionando o nó atual na lista de nós expandidos
      expanded.push(current)
    }

    // Através do nó-folha resultante, conseguimos o caminho-resultado
    let currentNode = path.pop()
    while (currentNode.parent !== null) {
      path.push(currentNode)
      currentNode = currentNode.parent
    }

    // Impriminod caminho-resultado
    while (path.length !== 0) {
      currentNode = path.pop()
      console.log('------')
      currentNode.ambiente.display()
    }
  }
}

export default Search
