module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        /* preferences */
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: '',
            },
            pw: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: '',
            },
        },
        /* options */
        {
            tableName: 'user',
            freezeTableName: false,
            underscored: false,
            timestamps: true,
        }
    );

    /* relations */
    user.associate = models => { }

    return user;
}