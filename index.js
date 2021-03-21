import {Ambiente} from './src'

(async () => {
  const ambiente = new Ambiente()
  await ambiente.creates()
  ambiente.display()
})()