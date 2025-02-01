const net = require('node:net')

function findAvaibalePort (desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvaibalePort(0).then(resolve)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = {
  findAvaibalePort
}
