module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user', // 테이블 이름과 동일하게 설정
        /* DB 속성 정의 */
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
        {
            tableName: 'user',      
            freezeTableName: false,
            underscored: false,
            timestamps: false,     
        }
    );

    /* 관계 설정 */
    user.associate = models => { }

    return user;
}