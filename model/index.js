const {Sequelize, DataTypes} = require('sequelize')
const config = require('config');

const sequelize = new Sequelize(
    config.get("database").database,
    config.get("database").user,
    config.get("database").password,
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