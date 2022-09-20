module.exports = (sequelize, dataTypes) => {
    const alias = 'SlideImage'
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        imageUrl: {
            type: dataTypes.STRING,
            allowNull: false
        },
        text: {
            type: dataTypes.STRING,
            allowNull: false
        },
        order: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        organizationId: {
            type: dataTypes.INTEGER,
        },
        deletedAt: {
            type: dataTypes.DATE
        }
    }
    const config = {
        tableName: 'slideImages',
        timestamps: true
    }

    const SlideImage = sequelize.define(alias,cols,config)

    return SlideImage
}