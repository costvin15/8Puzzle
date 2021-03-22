import {Ambiente, Puzzle} from './src'

(async () => {
  const ambiente = new Ambiente()
  await ambiente.creates()
  ambiente.display()

  const puzzle = new Puzzle(ambiente)
  puzzle.move('up')
  ambiente.display()
})()