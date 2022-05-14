

module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username already in use!'
              },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })

    Users.associate = (models) => {
        Users.hasMany(models.Menus, {
            onDelete: "cascade",
        });
    };
    
    return Users;
}