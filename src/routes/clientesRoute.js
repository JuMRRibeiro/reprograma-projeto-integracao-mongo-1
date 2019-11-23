

const express = require("express")
const router = express.Router()
const controller = require("../controllers/clientesController")
//npm install apidoc -g
//apidoc -i src/ -o public/apidoc

/**
 * @api {get} /clientes
 * @apiGroup Clientes
 * * 
 * @apiSuccess {Object[]} clientes Lista de Clientes
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *   [{
 *       "email": "Cindy@gmail.com",
 *       "nome": "Cindy ",
 *       "cpf": 2234567890,
 *       "dataNascimento": "1992-04-03T03:00:00.000Z",
 *       "estadoCivil": "Solteira",
 *       "telefone": 444456789,
 *       "comprou": true
 *   }]
 *
 */

//rotas definidas para o projeto que sera chamado no controller
router.get("/", controller.getClientes)//vc determina como sera o get desde que na controller tb seja o mesmo nome
router.get("/compradores", controller.getCompradores);
router.get("/:cpf", controller.getCpf);

//a rota que inclui o registro no banco de dados
router.post("/", controller.postCliente);//importa a rota para o controller consumir

router.put("/:cpf", controller.updateCliente)

router.delete("/:cpf", controller.deletarCliente)

module.exports = router