// caracteristicas do cliente que estrutura o banco de dados

const mongoose = require('mongoose');
//tipos de dados salvos no banco
const clientesSchema = new mongoose.Schema({
    nome: { type: String},
    email: { type: String },//required: true (quando um campo é obrigatorio)
    cpf: { type: Number },
    dataNascimento: { type: Date },
    estadoCivil: { type: String },
    telefone: { type: Number },
    comprou: { type: Boolean },
    password: {type: String}
},
    {
        versionKey: false//para nao ter versionamento
    })

const Clientes = mongoose.model('Clientes', clientesSchema);//tem um model no mongoouse e ele é composto pelo Clientes e sera consumido assim

module.exports = Clientes; //impotar pra quem chamar do model
