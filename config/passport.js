const {User} = require('../model')
let {signUp, login, jwtStrategy} = require('./auth');

module.exports = (passport) => {

    passport.use('signup', signUp)
    passport.use('login', login)
    passport.use('jwt',jwtStrategy)

    passport.serializeUser(function (user, done) {
        user.password = undefined
        done(null, user);
    })

    passport.deserializeUser(async (user, done) => {
        const userFromDb = await User.findOne(
            {
                attributes: {
                    exclude: [
                        "password"
                    ]
                },
                where: {id: user.id}
            }
        )
        if (userFromDb) {
            done(null, userFromDb);
        } else {
            done("You blocked")
        }
    })




}