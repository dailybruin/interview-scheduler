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
    }
  },
  {
  	classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.User.hasMany(models.Event);
      }
    }
  });
  sequelize.sync();
  return User;
};