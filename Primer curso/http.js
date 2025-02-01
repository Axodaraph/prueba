const http = require('node:http')
const { findAvaibalePort } = require('./12.free_port')

const desiredPort = process.env.PORT ?? 3000
console.log(process.env)
const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

findAvaibalePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
