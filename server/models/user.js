module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
  	name: {
  		type: DataTypes.STRING,
  		// allowNull: false,
  	},
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    token: {
    	type: DataTypes.STRING
    },
    schedule: { 
      type: DataTypes.STRING, 
      get() {
        return JSON.parse(this.getDataValue('schedule'));
      }, 
      set(val) {
        return this.setDataValue('schedule', val);
      }
    },
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
  // User.associate = function(models) {
  //   User.belongsToMany(models.Event, { through: 'UserEvent', as: 'event' });
  // };
  sequelize.sync();
  return User;
};