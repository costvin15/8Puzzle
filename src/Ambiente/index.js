import prompt from 'prompt'

const Ambiente = {
  create: async () => {
    prompt.start()

    try {
      const inputs = await prompt.get(['line1', 'line2', 'line3'])
      const matriz = new Array(3)
        .fill(Number.NEGATIVE_INFINITY)
        .map(() => new Array(3))
      
      // const line1 = inputs.line1.split(' ').map(value => {
      //   if (value === '_') {
      //     return Number.NEGATIVE_INFINITY
      //   }

      //   return parseInt(value, 10)
      // })
      let i = 0
      Object.keys(inputs).map(line => {
        // matrix[i]
        inputs[line].map(input => {
          matrix[i].push(input)
        })
        // console.log(inputs[line])

        i++
      })

      console.log(matriz)
    } catch (error) {
      console.error(error)
    }
  },
}

export default Ambiente
