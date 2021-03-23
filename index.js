import {Search} from './src'

(async () => {
  // console.log(puzzle.verify())
  // console.log(puzzle.heuristic())
  await new Search().perform()
})()