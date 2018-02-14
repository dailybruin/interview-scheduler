module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
  }, 
  {
    classMethods: {
      associate: function(models) {
      // associations can be defined here
        Event.hasMany(models.User);
      }
    }
  });
  
  sequelize.sync();
  return Event;
};