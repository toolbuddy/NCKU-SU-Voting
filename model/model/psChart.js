module.exports = function(sequelize, DataTypes) {
  var psChart = sequelize.define('psChart', {
    studentId: {
      type: DataTypes.STRING(25),
      primaryKey: true
    }
  })

  psChart.associate = function(models) {
    psChart.belongsTo(models.poll, {foreignKey: 'pollName'});
  }

  return psChart;
}
