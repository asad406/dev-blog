import app from './app'

function server() {
  app.listen(5000, () => {
    console.log('server running 🏃‍♂️‍➡️')
  })
}

server()
