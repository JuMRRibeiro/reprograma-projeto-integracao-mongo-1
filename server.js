
// inicia o servidor
const app = require("./src/app")// onde acessa as informacoes de conexao e dependencias
const port = 3001

app.listen(port, function() {
  console.log(`app está rodando na porta ${port}`)
})