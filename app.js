const express = require('express')
const config = require('config')
const {sequelize, syncSequelize} = require('./model')
const bodyparser = require('body-parser')
const passport = require('passport')
const {Router} = require('express')


const app = express()
const router = Router()
const PORT = config.get('port') || 3000
const API = config.get('api') || 'api'

app.use(express.static("public"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use(passport.initialize())

require('./routes')(router)
require('./config/passport')(passport)

app.use(`/${API}`, router)
app.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/');
});

(start = async () => {
    try {
        // await syncSequelize(true)
        await sequelize.authenticate()
            .then(() => console.log("Db connected ..."))
            .catch(err => console.log("Error", err))

        app.listen(PORT, () => {
            console.log(`App has been started on ${PORT}`)
        })
    } catch (e) {
        console.log('Server error:', e.message)
        process.exit(1)
    }
})()


