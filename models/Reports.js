

module.exports = (sequelize, DataTypes) => {

    const Reports = sequelize.define("Reports", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        report_desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {timestamps: false,})


    return Reports;
}