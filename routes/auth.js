const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const {User} = require('../model')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post('/registration',
    [
        check('email', 'Illegal email').isEmail(),
        check('password', 'Password doesnt be empty').exists()
    ],
    async (req, res) => {
        try {

            const errorsValidation = validationResult(req)

            if (!errorsValidation.isEmpty()) {
                return res.status(400).json({
                    errors: errorsValidation.array(),
                    message: "Illegal registration data",
                })
            }

            const {email, password} = req.body

            const queryResult = await User.findOne({
                where: {
                    email
                }
            });
            if (queryResult) {
                return res.status(500).json({message: 'User exist! Pls input another email'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            return await User.create({email, password: hashedPassword, status: 'unblock',name:'unknown'}) // !!!
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({message: 'Hasn\'t been authentication'})
        }
    })

router.post('/login',
    [
        check('email', 'Illegal email').isEmail(),
        check('password', 'Password doesnt be empty').exists()
    ],
    async (req, res) => {
        try {
            const errorsValidation = validationResult(req)
            if (!errorsValidation.isEmpty()) {
                return res.status(400).json({
                    errors: errorsValidation.array(),
                    message: "Illegal logins data",
                })
            }
            const {email, password} = req.body

            const user = await User.findOne({
                where: {
                    email
                }
            });

            if (user === null) {
                return res.status(400).json({message: 'User not exist!'})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Email or password exist!'})
            }

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                status: user.status
            };

            const token = jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, id: user.id})

        } catch (e) {
            return res.status(500).json({message: 'Hasn\'t been authentication'})
        }
    })

module.exports = router
