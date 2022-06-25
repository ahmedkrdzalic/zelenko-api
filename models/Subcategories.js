

module.exports = (sequelize, DataTypes) => {

    const Subcategories = sequelize.define("Subcategories", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {timestamps: false,})

    Subcategories.associate = (models) => {
        Subcategories.hasMany(models.Reports, {
            onDelete: "cascade",
        });
    };



    return Subcategories;
}