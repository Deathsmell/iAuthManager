const {Sequelize, DataTypes} = require('sequelize')
const config = require('config');

const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect: 'postgres',
    },
)

const syncSequelize = (sync) => {
    sequelize.sync({force: sync})
        .then(() => {
            console.log("Sequelize synced ...")
        })
        .catch(error => {
            console.log("Error",error)
        })
}




const User = require('./User')(sequelize, DataTypes);

module.exports = {
    User,
    sequelize,
    syncSequelize
}