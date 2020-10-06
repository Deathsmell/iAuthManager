const TABLE_NAME = 'usrs';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(TABLE_NAME,{
            id:{
                allowNull : false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email:{
                allowNull: false,
                type: Sequelize.STRING
            },
            password:{
                allowNull:false,
                type: Sequelize.STRING
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(TABLE_NAME)
    }
}