const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sqldb.config");

const BannerModel = sequelize.define("banners", {
    _id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },
    image: {
        type: DataTypes.JSON,
        allowNull: true,
    },
}, {
    timestamps: true, // ✅ createdAt/updatedAt automatically handle huncha — manually define nagar!
})

module.exports = BannerModel;