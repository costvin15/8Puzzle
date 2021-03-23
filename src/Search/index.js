import {Ambiente, Puzzle} from '..'

/**
 * @param {Ambiente} ambiente
 */
function Node(ambiente, level = 0, parent = null) {
  this.ambiente = ambiente
  this.puzzle = new Puzzle(ambiente)
  this.level = level
  this.parent = parent

  /**
   * 
   * @returns {Array<Puzzle>} next steps
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
  this.perform =  async () => {
    const expanded = [], nonexpanded = [], path = []
    const rootAmbiente = new Ambiente()
    await rootAmbiente.creates()

    const root = new Node(rootAmbiente)
    nonexpanded.push(root)

    while (nonexpanded.length !== 0) {
      const current = nonexpanded.shift()

      if (current.puzzle.verify()) {
        path.push(current)
        break
      }

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

      nonexpanded.sort((a, b) => a.evaluation() - b.evaluation())
      expanded.push(current)
    }

    let currentNode = path.pop()
    while (currentNode.parent !== null) {
      path.push(currentNode)
      currentNode = currentNode.parent
    }

    while (path.length !== 0) {
      currentNode = path.pop()
      console.log('-----------')
      currentNode.ambiente.display()
    }
  }
}

export default Search
