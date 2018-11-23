const express           = require('express')
const UserController    = require('../Controller/UsersController')
module.exports = (app) => {
    const apiRoutes = express.Router()

    app.use(
        apiRoutes.get('/api', (req, res) => {
          res.send('\n' +
                    '<h1 style="text-align: center;">API REST | TOPICOS ESPECIAIS III</h1>' +
                    '<h1 style="text-align: center;"><a href="/api-docs" style="color:green;">Clique aqui para ser redirecionado ao SWAGGER</a></h1>' +
                  '\n')
        })
    )

    app.use('/user',
        apiRoutes.post('/', UserController.createUser),
        apiRoutes.get('/', UserController.getAllUser),
        apiRoutes.get('/login/:email/:senha', UserController.getOneUser),
        apiRoutes.delete('/user/:id', UserController.deleteUser),
        apiRoutes.put('/user/:id', UserController.updateUser)
    )
}