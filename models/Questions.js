module.exports = (sequelize, DataTypes) => {

    const Questions = sequelize.define("Questions", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        questionText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })

    Questions.associate = (models) => {
        Questions.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    };
    
    
    return Questions;
}