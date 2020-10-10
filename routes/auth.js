const passport = require('passport')
const {User} = require('../model')
const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (router) => {

    router.post('/auth',async (req,res,next)=>{
        passport.authenticate('jwt',{},async (err,user,info)=>{
            if (err) console.log(err,info)
            if (user){
                res.status(200).json({isAuthenticated: true})
            } else {
                res.status(401).json({message:"Invalid jwt"})
            }
        })(req,res,next)
    })

    router.post('/signup',
        async (req, res, next) => {
            passport.authenticate(
                'signup',
                {
                    session: false,
                },
                (err, token, info) => {
                    if (token) {
                        res.json(info)
                    } else {
                        res.status(401).json(info)
                    }
                })(req, res, next)
        }
    )

    router.post('/login',
        async (req, res, next) => {
            passport.authenticate(
                'login',
                {
                    session: false,
                },
                async (err, user, info) => {
                    try {
                        if (err || !user) {
                            return res.status(401).json(info)
                        }

                        req.login(
                            user,
                            {},
                            async (error) => {
                                if (error) return next(error)

                                const token = jwt.sign(user, config.get('jwtSecret'))
                                return res.json({token, id: user.id})
                            }
                        )
                    } catch (error) {
                        return next("ERROR2: ", error)
                    }
                }
            )(req, res, next)
        }
    )

    const changeStatus = async (id, status) => {
        return await User.update({status}, {
            where: {
                id
            }
        })
    }

    const manageUsersCredential = (handler) => {
        return (req, res, next) => {
            return passport.authenticate(
                'jwt',
                {session: false},
                async (err, user, info) => {
                    if (err) return res.status(500).json(info)
                    let users = req.body.users;
                    console.log("USER",user,"USERS",users)
                    if (user && users) {
                        handler(users)
                        return res.status(200).json({message:"success"})
                    } else {
                        console.log(info)
                        return res.status(401).json(info)
                    }
                }
            )(req, res, next)
        }
    }


    router.post('/block', manageUsersCredential(async (users) => {
            await users.forEach(user => {
                changeStatus(user.id, "blocked")
            })
        })
    )

    router.post('/unblock', manageUsersCredential(async (users) => {
            await users.forEach(user => {
                changeStatus(user.id, "unblocked")
            })
        })
    )

    router.post('/delete', manageUsersCredential(async (users) => {
            await users.forEach(user => {
                User.destroy({
                    where: {
                        id: user.id
                    }
                })
            })
        })
    )
}

module.exports = auth