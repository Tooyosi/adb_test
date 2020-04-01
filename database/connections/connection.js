const Sequelize = require('sequelize');
const sequelize = new Sequelize("adb_test", "postgres", " ", {
    host: "127.0.0.1",
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: false
    }
});


module.exports = sequelize;
