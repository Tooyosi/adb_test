/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      comment: "null",
      primaryKey: true
    },
    'category_id': {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "null"
    },
    'isBooked': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: 'rooms',
    hooks:{
      afterSave: (app)=>{
        console.log("created")
      }
    }
  });
};
