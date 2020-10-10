const {User} = require('../model')
const passport = require('passport')
const moment = require('moment')
const config = require('config')
const UNBLOCK = config.get("status").unblock || "unblock"

const users = router => {
    router.get('/users',
        async (req, res, next) => {
            passport.authenticate(
                'jwt',
                {session: false},
                async (err, user, info) => {
                    if (user && user.status === UNBLOCK){
                        const users = await User.findAll({attributes: {exclude: ['password', 'updatedAt']}})
                        const usersNew = await users.map((user) => {
                            user.createdAt = moment(user.createdAt).format("hh:mm:ss MM-DD-YY");
                            return user
                        })
                        return res.status(200).json(usersNew)
                    } else {
                        return res.status(401).json(info)
                    }
                }
            )(req, res, next)
        }
    )
}

module.exports = users
