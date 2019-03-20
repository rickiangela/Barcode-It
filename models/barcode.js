module.exports = function(sequelize, DataTypes) {
    var Barcode = sequelize.define('Barcode', {
        barcode_num: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        photo_url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Barcode.associate = function(models) {
        Barcode.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Barcode.hasMany(models.Item);
    };

    return Barcode;
};