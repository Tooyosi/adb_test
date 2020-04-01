/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room_categories', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      autoIncrement: true,
      primaryKey: true
    },
    'name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    },
    'no_of_beds': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null"
    },
    'createdAt': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    },
    'updatedAt': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    },
    'description': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'room_categories'
  });
};
