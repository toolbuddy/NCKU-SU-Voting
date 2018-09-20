module.exports = function(sequelize, DataTypes) {
  var poll = sequelize.define('poll', {
    name: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    number: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  poll.associate = function(models) {
    poll.hasMany(models.psChart, {foreignKey: 'pollName'});
  }

  return poll;
}
