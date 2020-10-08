const express = require('express')
const config = require('config')
let {sequelize, syncSequelize} = require('./model');

const app = express()
const PORT = config.get('port') || 3000

app.use(express.json())
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/users'));

(start = async () => {
    try {
        // await syncSequelize(true)
        await sequelize.authenticate()
            .then(() => console.log("Db connected ..."))
            .catch(err => console.log("Error",err))

        app.listen(PORT, () => {
            console.log(`App has been started on ${PORT}`)
        })
    } catch (e) {
        console.log('Server error:', e.message)
        process.exit(1)
    }
})()


