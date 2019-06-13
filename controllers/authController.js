const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) =>{
        let {username, password, isAdmin} = req.body
        const db = req.app.get('db')
        let results = await db.get_user(username)
        let existingUser = results[0]
        if (existingUser) {
            return res.status(409).send('Username taken')
        }
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        let registeredUsers = await db.register_user(isAdmin, username, hash)
        let user = registeredUsers[0]

        req.session.user = {
            isAdmin: user.is_admin,
            id: user.id,
            username: user.username
        }
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        let {username, password} = req.body
        const db = req.app.get('db')
        let foundUsers = await db.get_user(username)
        let user = foundUsers[0]
        if (!user){
            res.status(401).send('User not found. Please register as a new user before logging in.')
        }
        let isAuthenticated = bcrypt.compareSync(password, user.hash)
        if (!isAuthenticated){
            res.status(403).send('Incorrect password')
        }
        req.session.user = {
            isAdmin: user.is_admin,
            id: user.id,
            username: user.username
        }
        res.status(200).send(req.session.user)
    },
    logout: async (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}