const express = require('express')
const config = require('config')
const {sequelize, syncSequelize} = require('./model')
const {User} = require('./model')
const session = require('express-session')
const cookie = require('cookie-parser')
const bodyparser = require('body-parser')
const passport = require('passport')
const {Router} = require('express')


const app = express()
const router = Router()
const PORT = config.get('port') || 3000


app.use(express.static("public"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use(passport.initialize())


require('./routes')(router)
require('./config/passport')(passport)



app.use('/api', router)
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});



(start = async () => {
    try {
        await syncSequelize(true)
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


