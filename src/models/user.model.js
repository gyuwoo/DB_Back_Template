/* sequelize에서 테이블 정의 */
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
        /* 부가 설정 */
        {
            tableName: 'user',      // DB에 저장될 테이블 이름
            freezeTableName: false,
            underscored: false,
            timestamps: false,      // createdAt, updatedAt 자동 설정
        }
    );

    /* 관계 설정 */
    user.associate = models => { }

    return user;
}