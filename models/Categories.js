module.exports = (sequelize, DataTypes) => {

    const Categories = sequelize.define("Categories", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },


    }, {timestamps: false,})

    Categories.associate = (models) => {
        Categories.hasMany(models.Subcategories, {
            onDelete: "cascade",
        });
    };

    
    
    return Categories;
}