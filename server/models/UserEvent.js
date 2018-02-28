module.exports = (sequelize, DataTypes) => {
  const UserEvent = sequelize.define('UserEvent', {
  	interviewer: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,

  },
  // {
  // 	// classMethods: {
  //  //    associate: function(models) {
  //  //    //   // associations can be defined here
  //  //      User.hasMany(models.Event);
  //  //    }
  //  //  }
  // }
  );
  return UserEvent;
};