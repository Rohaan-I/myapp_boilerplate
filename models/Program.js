const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Program = sequelize.define('programs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    programName: {
        type: Sequelize.STRING
    }
});

module.exports = Program;