const {Sequelize,DataTypes} = require('sequelize')
const config = require('config');

const sequelize = new Sequelize(
    config.get("database").database,
    config.get("database").user,
    config.get("database").password,
    {
        dialect: 'postgres',
    },
);

let User = require('./User')(sequelize,DataTypes);

module.exports ={
    User,
    sequelize,
}