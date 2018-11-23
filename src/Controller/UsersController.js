const User = require('../Models/userModel')
var crypto = require('crypto');


exports.createUser = (req, res, next) => {

  console.log('\n Requisição : \n', req.body)
  User.create({
    email:        req.body.email.toLowerCase(),
    senha:        crypto.createHash('md5').update(req.body.senha).digest('hex'),
    nome:         req.body.nome,
    sobrenome:    req.body.sobrenome,
    nascimento:   req.body.nascimento,
    estado:       req.body.estado,
    padrinho:     req.body.padrinho,
    facilidade:   req.body.facilidade,
    dificuldade:  req.body.dificuldade,
    esportes:     req.body.esportes,
    musicas:      req.body.musicas,
    filmes:       req.body.filmes,
    descricao:    req.body.descricao,
    foto:         req.body.foto
  }, (err, user) => {
    if (err)
      return res.status(500).send({message: 'Error creating user', error: err})

    if (!user || Object.keys(user).length === 0)
      return res.status(404).send('User not found!')

    return res.status(200).send({
      message: 'User created successfully!',
      User: user
    })
  })
}

exports.getAllUser = (req, res, next) => {
  User.find({"padrinho" : false}).exec((err, users) => {
    if (err)
      return res.status(500).send({error: err})

    if (!users || users.length === 0)
      return res.status(404).send('Users not found!')

    return res.status(200).json(users)
  })
}

exports.getOneUser = (req, res, next) => {
  //User.find({ email: req.params.email, senha: req.params.senha}, (err, user) => {
  User.find({ email: req.params.email.toLowerCase(), senha: crypto.createHash('md5').update(req.params.senha).digest('hex')}, (err, user) => {
    if (err)
      return res.status(500).send({message: 'Error fetching user', error: err})

    if (!user || Object.keys(user).length === 0)
      return res.status(404).send('User not found!')

    return res.status(200).send(user)
  })
}

exports.updateUser = (req,res, next) => {
  User.findById({ _id: req.params.id }, (err, user) => {
    if (err)
      return handleError(err)

    if (!user || Object.keys(user).length === 0)
      return res.status(404).send('User not found!')

    user.set({
      email:        req.body.email,
      senha:        req.body.senha,
      nome:         req.body.nome,
      sobrenome:    req.body.sobrenome,
      nascimento:   req.body.nascimento,
      estado:       req.body.estado,
      padrinho:     req.body.padrinho,
      facilidade:   req.body.facilidade,
      dificuldade:  req.body.dificuldade,
      esportes:     req.body.esportes,
      musicas:      req.body.musicas,
      descricao:    req.body.descricao,
      filmes:       req.body.filmes,
      foto:         req.body.foto
    })

    user.save((err, userUpdated) => {
      if (err)
        return handleError(err)

      return res.status(200).send({
        message: 'User updated successfully!',
        User: userUpdated
      })
    })
  })
}

exports.deleteUser = (req, res, next) => {
  User.findById(req.params.id, (err, userfind) => {
    if (err)
      return res.status(404).json({message: 'Error', error: err})

    if (!userfind || Object.keys(userfind).length === 0)
      return res.status(404).send('User not found!')

    User.remove({_id: req.params.id}, (err) => {
      if (err)
        return res.status(500).send({message: 'Error in delete user', error: err})

      return res.status(200).send({message: 'User deleted successfully!'})
    })
  })
}

