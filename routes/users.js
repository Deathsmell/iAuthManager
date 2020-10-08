const {Router} = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const {User} = require('../model')

const router = Router()

const findUserByToken = async (decodeToken) => {
    return await User.findOne({
        where: {
            id: decodeToken.id,
            name: decodeToken.name,
            email: decodeToken.email
        }
    });

}

const verifyUser = async (req, res) => {
    const body = req.body
    if (!body || !body.token) {
        res.status(400).json({
            message: "Request should be to contain jwt token",
        })
        return false
    }
    let user = null
    let decodeToken = null
    try {
        decodeToken = await jwt.verify(body.token, config.get('jwtSecret'));
        user = await findUserByToken(decodeToken)
    } catch (e) {
        console.error("ERRROR!!!!", e);
    }
    if (!user || !decodeToken) {
        res.status(401).json({
            message: "Unauthorized user or incorrect token",
        })
        return false
    }
    if (user.status !== decodeToken.status) {
        res.status(403).json({
            message: `${user.name} was blocked`,
        })
        return false
    }
    return true
}

const getUpdateFunction = (updateValue) => {
    return async (user) => {
        try {
            const updated = await User.update(updateValue, {
                where: {
                    id: user.id,
                    name: user.name
                }
            });
            if (updated) {
                console.log('Updated!\n', updated)
            }
        } catch (e) {
            console.log("Wasn't be updated", e)
        }

    }
}

router.get('/users', async (req, res) => {
    // const verify = await verifyUser(req, res)
    // if (!verify) {
    const listUsers = await User.findAll({
        attributes: {exclude: ['password']}
    });
    res.status(200).json(listUsers)
    // }
})

router.post('/block', async (req, res) => {
    const verify = await verifyUser(req, res);
    if (verify) {
        const body = req.body
        const updateValue = {status: "block"}
        const updateBlockFunction = getUpdateFunction(updateValue);
        await body.users.forEach(updateBlockFunction)
    }
})

router.post('/unblock', async (req, res) => {
    const verify = await verifyUser(req, res);
    if (verify) {
        const body = req.body
        const updateValue = {status: "unblock"}
        const updateUnblockFunction = getUpdateFunction(updateValue);
        await body.users.forEach(updateUnblockFunction)
    }

})

router.post('/delete', async (req, res) => {
    const verify = await verifyUser(req, res);
    if (verify) {
        const body = req.body
        await body.users.forEach(user => User.destroy({where: {id: user.id, name: user.name}}))
    }
})


module.exports = router
