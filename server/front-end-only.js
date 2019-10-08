const http = require('http')
const nodeStatic = require('node-static')

const file = new nodeStatic.Server('./public')

const server = http.createServer((req, res) => {
  req
    .addListener('end', () => {
      file.serve(req, res)
    })
    .resume()
})

server.listen(8800, () => {
  console.log('🚀  Server running on http://localhost:8800')
})
