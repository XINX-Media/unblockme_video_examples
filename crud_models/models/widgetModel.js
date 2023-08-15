const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Widget extends Model {}

Widget.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
    },
    {
        sequelize,
    }
);

module.exports = Widget;