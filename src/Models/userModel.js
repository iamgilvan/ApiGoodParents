var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'email is required']
    },
    senha: {
        type: String,
        required: [true, 'senha is required']
      },
    nome: {
        type: String,
        required: [true, 'name is required']
    },
    sobrenome: {
        type: String,
        required: [true, 'last name is required']
    },
    nascimento: {
        type: Date,
        required: [true, 'nascimento is required']
    },
    estado: {
        type: String,
        required: [true, 'validity is required']
    },
    padrinho: {
        type: Boolean,
        required: [true, 'value is required']
    },
    facilidade: {
        type: String,
        required: [true, 'validity is required']
    },
    dificuldade: {
        type: String,
        required: [true, 'validity is required']
    },
    esportes: {
        type: String,
        required: [true, 'validity is required']
    },
    musicas: {
        type: String,
        required: [true, 'validity is required']
    },
    filmes: {
        type: String,
        required: [true, 'validity is required']
    },
    descricao: {
        type: String,
        required: [true, 'validity is required']
    },
    foto: {
        type: String,
        required: [true, 'validity is required']
    },
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)