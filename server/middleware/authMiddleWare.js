module.exports = {
    usersOnly: (req, res, next) => {
        if(!req.session.user){
            res.status(401).send('Please log in, sucka!')
        }
        next()
    },
    adminsOnly: (req, res, next) => {
        if(!req.session.user.isAdmin){
            res.status(403).send('You sure as heck ain\'t an admin')
        }
        next()
    }
}