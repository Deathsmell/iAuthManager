
module.exports = (sequelize,DataTypes) => {
    return sequelize.define('usr', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {});
};