/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'category_id': {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "null"
    },
    'checkin_date': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    },
    'checkout_date': {
      type: DataTypes.DATEONLY,
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
    }
  }, {
    tableName: 'rooms'
  });
};
