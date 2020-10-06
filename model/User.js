module.exports = (sequelize,DataTypes) => {
    return sequelize.define('usr', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {});
};