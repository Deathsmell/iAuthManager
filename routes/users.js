const {User} = require('../model')
const passport = require('passport')

const users = router => {
    router.get('/users',
        async (req, res, next) => {
            passport.authenticate(
                'jwt',
                {session: false},
                async (err, user, info) => {
                    if (user && user.status === 'unblocked'){
                        const users = await User.findAll({attributes: {exclude: ['password', 'updatedAt']}})
                        return res.status(200).json(users)
                    } else {
                        return res.status(401).json(info)
                    }
                }
            )(req, res, next)
        }
    )
}

module.exports = users
