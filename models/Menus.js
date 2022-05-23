module.exports = (sequelize, DataTypes) => {

    const Menus = sequelize.define("Menus", {

        menuDATA: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Menu name already in use!'
              },
        },

    })
    
    
    return Menus;
}