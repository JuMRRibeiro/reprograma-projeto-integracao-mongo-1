
//informar as requisicoes e onde ele vai buscar as informacoes 
const Clientes = require('../model/clientes')//faz a consulta no banco de dados ao inves do json
const Joi = require('joi')
const bcrypt = require("bcryptjs");
const bcryptSalt = 8;

const fs = require('fs');

//modulo Get
exports.getClientes = (req, res) => {
  //faz a conexao com o banco, retorna todos os objetos do banco
  Clientes.find(function (err, clientes) {//retornar erro ou sucesso
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(clientes)//de acordo com o escopo da funcao;
  })
}

exports.getCompradores = (req, res) => {
  Clientes.find({ comprou: true }, function (err, cliente) {//so os clientes que compraram
    if (err) return res.status(500).send(err);
    res.status(200).send(clientes)//todos os dados dos clientes que compraram
    const clientesRetorno = clientes.map(clientes => {// percorrer o array filtrado e trazer só os que tenham nome e email
      return {
        nome: cliente.nome,
        email: cliente.email
      }
    })

    res.status(200).send(clientesRetorno)
  })
}

/*   const clienteComprador = cliente.filter(cliente => cliente.comprou == true)
   console.log(clienteComprador)
   const cliComprador = clienteComprador.map(({ nome, email }) => ({ nome, email }))// desconstrucao puxa quantos quiserrr
   // console.log(cliComprador)
   // const clienteComprou = cliComprador.map(cliente => cliente.email)
   console.log(cliComprador)
   res.status(200).send(cliComprador)
 }
 )
}
*/
exports.getCpf = (req, res) => {
  const cpf = req.params.cpf;

  Clientes.find({ cpf/*: cpf quando tem o mesmo nome de chave e valor, basta colocar só uma informação*/ }, function (err, cliente) {// faz o filtro dentro do banco de dados
    if (err) return res.status(500).send(err)
    res.status(200).send(cliente)
  })
}

// modulos post
exports.postCliente = (req, res) => {//exporta a rota para a route consumir
  let cliente = new Clientes(req.body);// pega as informacoes do body de acordo com o schema

  cliente.save(function (err) {//funcao de salvar se estiver tudo ok conforme o schema
    if (err) res.status(500).send(err);//volta erro se nao estiver igual ao schema
    res.status(201).send({ status: true, message: ' Cliente incluido com sucesso' });
  })
}
exports.post = async (req, res) => { 

  const { nome, password, email, cpf, dataNascimento, estadoCivil, telefone, comprou } = req.body;
  console.log(req.body);
  const salt = bcrypt.genSaltSync(bcryptSalt);
  //try {
    //const {nome, password, email, cpf, dataNascimento, estadoCivil, telefone, comprou} = req.body;
    
    
    const hashPass = await bcrypt.hashSync(password, salt);
    const newCliente = new Clientes({nome, hassPass, email, cpf, dataNascimento, estadoCivil, telefone, comprou})
    Clientes.save()
    //cliente.save(function (err)  {
     // .then(() =>{
res.status(200).json("novo Cliente criado")
      //});
      if (err) {
        return res.status(500).send({ message: err });
      }
      console.log("The file was saved!");
    //});
    //return res.status(201).send(clientes); 
    //} catch (e) {
    //return res.status(401).json({ error: 'erro' });
    }


exports.updateCliente = (req, res) => {
  if (!validaFormulario(req.body)) return res.status(400).send({message: "Campo inválido!"});
  Clientes.update(
    { cpf: req.params.cpf },
    { $set: req.body },
    { upsert: true },
    function (err) {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Atualizado com sucesso!" });
    })
}

const validaFormulario = (campos) => {
  const schema = {
    nome: Joi.string().min(1).required(),
    email: Joi.string().min(1).required(),
  }
const validation = Joi.validade(campos, schema);

  if(validation.error){
  return false;
}
return true;
}

exports.deletarCliente = (req,res) => {

  const cpfCliente = req.params.cpf;

  Clientes.findByCpf(cpfCliente, function(err, cliente){

    if (err) return res.status(500).send(err);

    if (!cliente) {
      return res.status(200).send({message: "Infelizmente não localizei o Cliente!"});
    }

    cliente.remove(function (err){
    if (!err){
      res.status(204).send({message:"Cliente removido com sucesso!"})
    }

  })
})
}