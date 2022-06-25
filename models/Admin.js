module.exports = (sequelize, DataTypes) => {

    const Categories = sequelize.define("Categories", {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }


    }, {timestamps: false,})

    return Categories;
}