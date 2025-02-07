const http = require('node:http')

// commonJS -> modulos clasicos de node
// Puedes importar directamente un JSON
const dittoJson = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'aplication/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJson))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon':{
          let body = ''

          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              // llamar una base de datos para guardar info
              res.writeHead(201, {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store' // Ejemplo de header válido
              })

              data.timestamp = Date.now()
              res.end(JSON.stringify(data))
            } catch (e) {
              res.writeHead(400, {
                'Content-Type': 'application/json',
                'X-Error-Code': 'INVALID_JSON' // Header personalizado válido
              })
              res.end(JSON.stringify({ error: 'Formato inválido' }))
            }
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')

          // ????
      }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('server listening on port http://localhost:1234')
})
